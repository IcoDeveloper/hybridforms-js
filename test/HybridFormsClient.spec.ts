import { expect, use } from 'chai';
import chaiUuid from 'chai-uuid';
import { createClient } from '../src';

use(chaiUuid);

const hybridforms = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('HybridFormsClient', () => {
    it('.request()', async () => {
        const resp = await hybridforms.request({
            url: 'https://httpbin.org/uuid',
            type: 'GET',
            responseType: 'json'
        });
        expect(resp?.response).to.not.equal(null);
        expect(resp?.response?.uuid).to.be.a.uuid('v4');
    });
});
