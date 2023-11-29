import { expect } from 'chai';
import { createClient } from '../src';
import HybridFormsClient from '../src/HybridFormsClient';

const hybridforms: HybridFormsClient = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('FormController', () => {
    it('.listForms()', async () => {
        const forms = await hybridforms.forms.listForms(
            '3ee88190-749a-4c65-8437-e392f6eabf71'
        );
        expect(forms).to.not.equal(null);
        expect(forms?.response?.forms).to.not.equal(null);
        expect(forms?.response?.forms).to.be.an('array');
    });

    it('.getForm()', async () => {
        const form = await hybridforms.forms.getForm(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05'
        );
        expect(form).to.not.equal(null);
        expect(form?.response?.version).to.equal(16);
        expect(form?.response?.files?.length).to.equal(4);
    });

    it('.listFormFiles()', async () => {
        const files = await hybridforms.forms.listFormFiles(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05'
        );
        expect(files).to.not.equal(null);
        expect(files?.response).to.be.an('array');
        expect(files?.response?.length).to.equal(4);
    });

    it('.getFormFile()', async () => {
        const file = await hybridforms.forms.getFormFile(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05',
            'Basistest-Controls.pdf'
        );
        expect(file).to.not.equal(null);
        expect(file?.response?.type).to.equal('application/pdf');
        expect(file?.response?.size).to.greaterThan(1000000);
    });
});
