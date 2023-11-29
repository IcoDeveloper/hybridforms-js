import { expect } from 'chai';
import { createClient } from '../src';
import HybridFormsClient from '../src/HybridFormsClient';
import { SimpleAPIData } from '../src/types/formTypes';

const hybridforms: HybridFormsClient = createClient({
    baseUrl: process.env.HF_BASE_URL ?? '',
    clientId: '1',
    user: process.env.HF_USER ?? '',
    password: process.env.HF_PASSWORD ?? ''
});

const formData: SimpleAPIData = {
    title: 'A sample form created with Postman',
    owner: process.env.HF_USER,
    fields: {
        // Set simple fields (Text, numbers)
        ma_name: 'Erwin Schrödinger',
        'qr-textfield': '123456789',
        tab1_textfield_text: 'ABCDE',
        tab1_textfield_email: 'erwin.schroedinger@genius.net',
        checkboxv1: true,
        checkboxv4: true,
        tab1_textfield_decimal: '23.4',
        tab1_numeric: 34,
        tab1_numeri_standard: 23,
        tab1_textarea_small:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',

        // Set Radiobuttons (and reset all other of the same group)
        radioh3: true,

        // Set date/time fields and set the shadow/presentations values as well, optional with timezone
        tab1_datepicker: '2019-02-01T00:00:00Z',
        tab1_datepicker2: '2019-02-01T00:00:00+01',

        // Set Comboboxes. No need to supply the displayvalue, simply supply the value if you are using catalogs
        tab1_combobox_statisch: 'Selection 03',
        tab1_combobox_sp_liste: '201101',
        tab1_selectbox: '2',
        dropdownlist: 'No. 11',
        dropdownlist2: 'No. 08',
        'dropdownlist-catalog': '201101'
    },
    repeatingUnits: {
        // Simple
        repeating1: [
            {
                operation: 'create',
                fields: {
                    repeating_first_name: 'This row 1 of a repeating unit'
                }
            },
            {
                // operation default is create
                fields: {
                    repeating_first_name: 'This row 2 of a repeating unit'
                }
            }
        ],

        // Another repeating unit
        repeating2: [
            {
                fields: {
                    repeating2_selectbox: 'Repeating Select 2'
                }
            }
        ]
    },
    pictures: [
        {
            filename: 'hybridforms-icon.jpg',
            content:
                '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCAAVABgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAYFB//EACoQAAEDAwIFAgcAAAAAAAAAAAECAxEABAUSIRMUMUGhBmEHFRYjMpGS/8QAFgEBAQEAAAAAAAAAAAAAAAAABQID/8QAHxEAAQQBBQEAAAAAAAAAAAAAAgABAxEEEhMxMoHw/9oADAMBAAIRAxEAPwDr2YyyMWyyBpU/cuBplKiQCo9zHYVBK9Z5mHbu3y1lcNtweXTarSFSfxBKRv3iZ2NUHrxl5tOMyrbSnmrB4qdQgwdKo38eal8dfobxfOWAaeyiVFNqx9ttFmDtxlAkBTqo6jp7bU7iQx7Wt2u/vELlTSbuhnqvvV0PBZgZmxLi2lW9w0rhvsK6tqif1BmlT/w4x11aY28ubsKBuXRp1GdWmZVPeSTv7Uo3JAQlIR4SOOZHEJFyrJSQtJSsBSSIIIkEVjfR+A5rj/K2dczvOn+ZjxSlZDIYdXpaEAH2a1spSEJCUgJSBAAGwpSlSrX/2Q=='
        }
    ],
    documents: [
        {
            filename: 'a-sample-textfile.txt',
            content: 'VGhpcyBpcyBqdXN0IHRleHQu',

            // do not attach this document to the form PDF
            hideInPDF: true
        }
    ]
};

describe('SimpleAPIController', () => {
    let itemID: string | null = null;

    it('.post()', async () => {
        const form = await hybridforms.simpleAPI.post(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            formData
        );
        expect(form).to.not.equal(null);
        expect(form?.response?.itemID).to.not.equal(null);
        expect(form?.response?.itemID).to.be.a('string');
        expect(form?.response?.listData?.ma_name).to.equal('Erwin Schrödinger');

        itemID = form?.response?.itemID;
    });

    it('.put()', async () => {
        if (!itemID) {
            throw new Error('No itemID found');
        }

        const form = await hybridforms.simpleAPI.put(
            '3ee88190-749a-4c65-8437-e392f6eabf71',
            itemID,
            {
                fields: {
                    ma_name: 'Erwin Schrödinger Update'
                }
            }
        );
        expect(form).to.not.equal(null);
        expect(form?.response?.itemID).to.not.equal(null);
        expect(form?.response?.itemID).to.be.a('string');
        expect(form?.response?.listData?.ma_name).to.equal(
            'Erwin Schrödinger Update'
        );
    });
});
