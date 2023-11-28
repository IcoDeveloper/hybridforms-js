import { expect } from 'chai';
import { createClient } from '../src';
import HybridFormsClient from '../src/HybridFormsClient';

const hybridforms: HybridFormsClient = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

describe('CatalogsController', () => {
    it('.listCatalogs()', async () => {
        const catalogs = await hybridforms.catalogs.listCatalogs();
        expect(catalogs).to.not.equal(null);
        expect(catalogs?.length).to.greaterThan(0);
    });

    it('.getCatalog()', async () => {
        const catalog = await hybridforms.catalogs.getCatalog('DummyCatalog');
        expect(catalog).to.not.equal(null);
        expect(catalog).to.be.an('object');
    });

    it('.exportCatalog()', async () => {
        const catalog = await hybridforms.catalogs.exportCatalog(
            'DummyCatalog',
            { format: 'json' }
        );
        expect(catalog).to.not.equal(null);
        expect(catalog).to.be.an('object');
    });

    it('.createCatalog()', async () => {
        const data = {
            Name: 'DummyCatalog_Test',
            entries: [
                {
                    Fields: {
                        ID: '1',
                        KatalogText: 'gelb'
                    }
                }
            ]
        };
        const catalog = await hybridforms.catalogs.createCatalog(
            'DummyCatalog_Test',
            data
        );
        expect(catalog).to.not.equal(null);
        expect(catalog).to.be.an('array');
    });

    it('.updateCatalog()', async () => {
        const data = {
            Name: 'DummyCatalog_Test',
            entries: [
                {
                    Fields: {
                        ID: '1',
                        KatalogText: 'gelb'
                    }
                }
            ]
        };
        data.entries.push({
            Fields: {
                ID: '2',
                KatalogText: 'rot'
            }
        });
        const catalog = await hybridforms.catalogs.createCatalog(
            'DummyCatalog_Test',
            data
        );
        expect(catalog).to.not.equal(null);
        expect(catalog).to.be.an('array');
    });

    it('.deleteCatalog()', async () => {
        const catalog =
            await hybridforms.catalogs.deleteCatalog('DummyCatalog_Test');
        expect(catalog).to.not.equal(null);
        expect(catalog?.deleted).to.equal(true);
    });
});
