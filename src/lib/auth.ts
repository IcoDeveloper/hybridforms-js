import * as jwt from 'jwt-decode';
import { SigninResponse } from '../types/types';
import { resolveRequest } from './fetch';
import { getUrl } from './helper';

export interface IGatewayData {
    baseUrl: string;
    clientID?: string;
    gatewayVersion: string;
    loginMethod: LoginMethodEnum;
    metaDataAddress?: string;
    product: string;
    scope?: string;
    maxFileSizeMb?: number;
    preLoginScreen?: boolean;
}

export enum LoginMethodEnum {
    Windows = 'WindowsAuthentication',
    Basic = 'BasicAuthentication',
    ADFS = 'ADFS',
    AzureAD = 'AzureAD'
}

export class Authentication {
    private auth: SigninResponse | null = null;
    private gatewayData: IGatewayData | null = null;

    constructor(
        private readonly baseUrl: string,
        private readonly user: string,
        private readonly password: string
    ) {}

    private async getAdfsAccess(): Promise<SigninResponse> {
        const clientID = this.gatewayData?.clientID;
        if (clientID) {
            const params = new URLSearchParams({
                grant_type: 'password',
                username: this.user,
                password: this.password,
                client_id: clientID,
                resource: getUrl('/', this.baseUrl)
            });

            const authUrl = getUrl('/api/app/token', this.baseUrl);
            const resp = await resolveRequest()({
                url: authUrl,
                type: 'POST',
                responseType: 'json',
                data: params
            });

            return resp.response;
        } else {
            throw new Error('Cannot fetch HybridForms token.');
        }
    }

    private async getAzureAdAccess(): Promise<SigninResponse> {
        const serverId = this.gatewayData?.scope ?? '';
        const parts = serverId.split('/');
        if (parts.length) {
            parts.pop();
        }
        const scope = parts.join('/') + '/.default';

        if (scope) {
            const params = new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: this.user,
                client_secret: this.password,
                scope
            });

            const authUrl = getUrl('/api/app/token', this.baseUrl);
            const resp = await resolveRequest()({
                url: authUrl,
                type: 'POST',
                responseType: 'json',
                data: params
            });

            return resp.response;
        } else {
            throw new Error('Cannot fetch HybridForms token.');
        }
    }

    private async getBasicAuthAccess(): Promise<SigninResponse> {
        const base64 = btoa(`${this.user}:${this.password}`);
        return await Promise.resolve({
            access_token: base64,
            token_type: 'Basic'
        });
    }

    private async getGatewayData(): Promise<void> {
        const gatewayUrl = getUrl('/api/app/gatewayData', this.baseUrl);
        const resp = await resolveRequest()({
            url: gatewayUrl,
            type: 'GET',
            responseType: 'json',
            headers: {
                'X-HF-Version': 'HybridForms 9.0.0'
            }
        });

        this.gatewayData = resp.response;
    }

    public async getAccess(): Promise<SigninResponse> {
        if (!this.auth) {
            await this.getGatewayData();
        }

        let fetchToken = true;
        if (this.auth && this.auth.token_type !== 'Basic') {
            const decoded: any = jwt.jwtDecode(this.auth.access_token);
            const exp = decoded.exp;
            const now = Math.floor(Date.now() / 1000);

            fetchToken = exp < now;
        }

        if (fetchToken) {
            switch (this.gatewayData?.loginMethod) {
                case LoginMethodEnum.ADFS:
                    this.auth = await this.getAdfsAccess();
                    break;
                case LoginMethodEnum.AzureAD:
                    this.auth = await this.getAzureAdAccess();
                    break;
                case LoginMethodEnum.Windows:
                    this.auth = await this.getBasicAuthAccess();
                    break;
                default:
                    throw new Error(
                        'Something went wrong while trying to get login method.'
                    );
            }
        }

        if (!this.auth) {
            throw new Error('Cannot fetch HybridForms token.');
        }

        return this.auth;
    }
}
