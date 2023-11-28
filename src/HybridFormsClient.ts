import { AuthController } from '@/controller/AuthController';
import { FormDefinitionsController } from '@/controller/FormDefinitionsController';
import { FormsController } from '@/controller/FormsController';
import { Authentication } from '@/lib/auth';
import { requestWithAuth, resolveRequest } from '@/lib/fetch';
import {
    HybridFormsClientConfig,
    RequestType,
    SigninResponse
} from '@/types/types';

export class HybridFormsClient {
    private readonly authInstance: Authentication | null = null;

    public readonly request: RequestType;
    public readonly requestWithAuth: RequestType;

    public readonly auth: AuthController;
    public readonly formDefinitions: FormDefinitionsController;
    public readonly forms: FormsController;

    constructor(config: HybridFormsClientConfig) {
        let getAccess: (() => Promise<SigninResponse | null>) | null = null;
        if (config.user && config.password) {
            this.authInstance = new Authentication(
                config.baseUrl,
                config.user,
                config.password
            );
            getAccess = this.authInstance.getAccess.bind(this.authInstance);
        }

        if (config.xhr) {
            getAccess = async () => {
                return await Promise.resolve(null);
            };
        }

        if (getAccess === null) {
            throw new Error('No authentication method provided.');
        }

        this.request = resolveRequest(config.xhr);
        this.requestWithAuth = requestWithAuth(getAccess, config.xhr);

        this.auth = new AuthController(
            config,
            this.requestWithAuth,
            this.authInstance
        );
        this.formDefinitions = new FormDefinitionsController(
            config,
            this.requestWithAuth
        );
        this.forms = new FormsController(config, this.requestWithAuth);
    }
}
