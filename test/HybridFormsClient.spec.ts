import { expect } from 'chai';
import { createClient } from '../src';
import HybridFormsClient from '../src/HybridFormsClient';

const hybridforms: HybridFormsClient = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('HybridFormsClient', () => {
    it('.request()', async () => {
        const url =
            (process.env.HF_BASE_URL as string) + '/api/app/gatewaydata';
        const resp = await hybridforms.request({
            url,
            type: 'GET',
            responseType: 'json'
        });
        expect(resp?.response).to.not.equal(null);
        expect(resp?.response?.product).to.equal('HybridForms Server');
    });
});
