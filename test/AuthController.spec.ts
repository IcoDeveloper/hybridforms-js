import { expect } from 'chai';
import { createClient } from '../src';

const hybridforms = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('AuthController', () => {
    it('.getAccess()', async () => {
        const auth = await hybridforms.auth.getAccess();
        expect(auth).to.not.equal(null);
        expect(auth?.access_token).to.not.equal(null);
        expect(auth?.token_type).to.equal('bearer');
    });

    it('.getUserData()', async () => {
        const user = await hybridforms.auth.getUserData();
        expect(user).to.not.equal(null);
        expect(user?.id).to.equal('135');
        expect(user?.accountName).to.equal('rsi@icomedias.com');
        expect(user?.options).to.deep.equal({});
        expect(user?.clients).to.be.an('array');
        expect(user?.clients?.length).to.greaterThan(1);
    });

    it('.getUserDataWithClient()', async () => {
        const user = await hybridforms.auth.getUserDataWithClient();
        expect(user).to.not.equal(null);
        expect(user?.id).to.equal('135');
        expect(user?.accountName).to.equal('rsi@icomedias.com');
        expect(user?.options?.googleMapsApiKey).to.not.equal(null);
        expect(user?.clients).to.be.an('array');
        expect(user?.clients?.length).to.equal(1);
    });
});
