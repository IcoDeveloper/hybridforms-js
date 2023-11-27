interface FormFieldDictionary {
    [key: string]: null | boolean | number | string;
}

interface Group {
    id: number;
    title: string;
    upn: string;
    email: string;
    isGroup: boolean;
    address: string;
    company: string;
    logoUrl: string;
}

interface AclServerFormat {
    id: number;
    title: string;
    upn: string;
    email: string;
}

interface FileServer {
    contentType: string;
    filename: string;
    modified: string;
    size: number;
    version: number;
    fileID: number;
}

interface StatisticPages {
    label: string;
    open: number;
}

interface Statistic {
    offline: number;
    open: number;
    pages: {
        [key: string]: StatisticPages;
    };
    statusGroupToEdit: number;
    statusEditToGroup: number;
    time: number;
    oneColumn: number;
    twoColumns: number;
}

interface FormBriefServerFormat {
    displayVersion: string;
    completion: number;
    created: string;
    feedback: string;
    itemID: string;
    listData: FormFieldDictionary;
    lockedBy?: string;
    lockedDate?: string;
    mainImage: string;
    modified?: string;
    modifiedBy?: string;
    pdfDate?: string;
    pdfVersion?: number;
    saveStatus: string;
    status: string;
    title: string;
    version: number;
    stage?: string;
    isExtendedRead: boolean;
    group: Group;
    owner?: AclServerFormat;
}

interface FormServerFormat extends FormBriefServerFormat {
    createdBy?: string;
    fields: FormFieldDictionary;
    files?: FileServer[];
    audio: any[];
    documents: any[];
    links: any[];
    maps: any[];
    pictures: any[];
    sketches: any[];
    models: any[];
    statistic: Statistic;
}

export interface ListFormsParams {
    format?: 'minimal' | 'brief' | 'full';
    allforms?: boolean;
    pdfready?: boolean;
    stage?: string;
    status?: 'Edit' | 'Group' | 'Approved' | 'Archived';
    query?: string;
    modifiedSince?: string;
    modifiedBefore?: string;
    createdSince?: string;
    createdBefore?: string;
    deleted?: boolean;
    page?: number;
    hitsPerPage?: number;
}

export interface ListFormsResponse {
    forms: FormServerFormat[];
    queryDate: string;
    isPaged: boolean;
    page: number;
    hitsPerPage: number;
    totalCount: number;
    totalPages: number;
}

export interface GetFormParams {
    format?: 'minimal' | 'brief' | 'full' | 'repeating';
}

export type GetFormResponse = FormServerFormat;

export type ListFormFilesResponse = FileServer[];
