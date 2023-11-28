import { HybridFormsClientConfig, RequestType } from '@/types/types';

export abstract class BaseController {
    protected basePath: string = '';
    constructor(
        protected readonly config: HybridFormsClientConfig,
        protected readonly request: RequestType
    ) {
        this.init();
    }

    protected abstract init(): void;
}
