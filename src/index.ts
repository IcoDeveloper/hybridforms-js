import HybridFormsClient from '@/HybridFormsClient';
import { HybridFormsClientConfig } from '@/types/types';

export const createClient = (
    config: HybridFormsClientConfig
): HybridFormsClient => {
    return new HybridFormsClient(config);
};
