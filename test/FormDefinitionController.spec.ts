import { expect } from 'chai';
import { createClient } from '../src';
import HybridFormsClient from '../src/HybridFormsClient';

const hybridforms: HybridFormsClient = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('FormDefinitionController', () => {
    it('.getFormDefinitions()', async () => {
        const formDefinitions =
            await hybridforms.formDefinitions.getFormDefinitions();
        expect(formDefinitions).to.not.equal(null);
        expect(formDefinitions?.response?.length).to.not.equal(0);
    });

    it('.getFormDefinition()', async () => {
        const formDefinition =
            await hybridforms.formDefinitions.getFormDefinition(
                '3ee88190-749a-4c65-8437-e392f6eabf71'
            );
        expect(formDefinition).to.not.equal(null);
        expect(formDefinition?.response?.id).to.equal(38);
        expect(formDefinition?.response?.version).to.be.an('number');
        expect(formDefinition?.response?.files?.length).to.be.greaterThan(30);
    });

    it('.getMyGroups()', async () => {
        const groups = await hybridforms.formDefinitions.getMyGroups(
            '3ee88190-749a-4c65-8437-e392f6eabf71'
        );
        expect(groups).to.not.equal(null);
        expect(groups?.response?.length).to.equal(4);
    });

    it('.getFormDefinitionFile()', async () => {
        const file = await hybridforms.formDefinitions.getFormDefinitionFile(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            'testForm.html'
        );
        expect(file).to.not.equal(null);
        expect(file?.response?.type).to.equal('text/html');
        expect(file?.response?.size).to.greaterThan(200000);
    });

    it('.getFormDefinitionStructure()', async () => {
        const structure =
            await hybridforms.formDefinitions.getFormDefinitionStructure(
                '3ee88190-749a-4c65-8437-e392f6eabf71'
            );
        expect(structure).to.not.equal(null);
        expect(structure?.response?.sections).to.be.an('array');
        expect(structure?.response?.sections?.length).to.not.equal(0);
        expect(structure?.response?.info).to.not.equal(null);
    });
});
