import { expect } from 'chai';
import { createClient } from '../src';

const hybridforms = createClient({
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
        expect(forms?.forms).to.not.equal(null);
        expect(forms?.forms).to.be.an('array');
    });

    it('.getForm()', async () => {
        const form = await hybridforms.forms.getForm(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05'
        );
        expect(form).to.not.equal(null);
        expect(form?.version).to.equal(16);
        expect(form?.files?.length).to.equal(4);
    });

    it('.listFormFiles()', async () => {
        const files = await hybridforms.forms.listFormFiles(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05'
        );
        expect(files).to.not.equal(null);
        expect(files).to.be.an('array');
        expect(files?.length).to.equal(4);
    });

    it('.getFormFile()', async () => {
        const file = await hybridforms.forms.getFormFile(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            '868aa759-8c9b-de3c-a3d9-1c29932b4e05',
            'Basistest-Controls.pdf'
        );
        expect(file).to.not.equal(null);
        expect(file?.type).to.equal('application/pdf');
        expect(file?.size).to.greaterThan(1000000);
    });
});
