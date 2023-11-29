import { Authentication } from '../lib/auth';
import { getUrl } from '../lib/helper';
import { UserResponse } from '../types/authTypes';
import {
    FetchResponse,
    HybridFormsClientConfig,
    RequestType,
    SigninResponse
} from '../types/types';
import { BaseController } from './BaseController';

export class AuthController extends BaseController {
    constructor(
        protected readonly config: HybridFormsClientConfig,
        protected readonly request: RequestType,
        protected readonly authInstance: Authentication | null = null
    ) {
        super(config, request);
    }

    protected init(): void {
        this.basePath = '/api/app';
    }

    public async getAccess(): Promise<SigninResponse> {
        if (this.authInstance === null) {
            throw new Error('No authentication method provided.');
        }

        return await this.authInstance.getAccess();
    }

    public async getUserData(): Promise<FetchResponse<UserResponse>> {
        const response = await this.request({
            url: getUrl(`${this.basePath}/userData`, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getUserDataWithClient(): Promise<FetchResponse<UserResponse>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/userData/${this.config.clientId}`,
                this.config.baseUrl
            ),
            type: 'POST',
            responseType: 'json'
        });
        return response;
    }
}
