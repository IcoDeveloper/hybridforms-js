export type FormFieldDictionary = Record<
    string,
    null | boolean | number | string
>;

export interface Group {
    id: number;
    title: string;
    upn: string;
    email: string;
    isGroup: boolean;
    address: string;
    company: string;
    logoUrl: string;
}

export interface AclServerFormat {
    id: number;
    title: string;
    upn: string;
    email: string;
    isGroup: boolean;
}

export interface FileServer {
    contentType: string;
    filename: string;
    modified: string;
    size: number;
    version: number;
    fileID: number;
}

export interface StatisticPages {
    label: string;
    open: number;
}

export interface Statistic {
    offline: number;
    open: number;
    pages: Record<string, StatisticPages>;
    statusGroupToEdit: number;
    statusEditToGroup: number;
    time: number;
    oneColumn: number;
    twoColumns: number;
}

export interface FormMinimalServerFormat {
    itemID: string;
    version: number;
    displayVersion: string;
    title: string;
    status: string;
    isExtendedRead: boolean;
    completion: number;
    feedback: string;
    modified: string;
    created: string;
    pdfDate: string;
    pdfReady: boolean;
    pdfVersion: number;
    stage: string;
    reachOutUrl: string;
    reachOutDate: string;
    badges: any[];
    scheduledDate: string;
}

export interface FormBriefServerFormat extends FormMinimalServerFormat {
    saveStatus: string;
    listData: FormFieldDictionary;
    modifiedBy: string;
    modifiedUser: AclServerFormat;
    createdBy: string;
    createdUser: AclServerFormat;
    group: Group;
    owner: AclServerFormat;
    lockedBy?: string;
    lockedDate?: string;
}

export interface FormFullServerFormat extends FormBriefServerFormat {
    fields: FormFieldDictionary;
    files: FileServer[];
    audio: any[];
    documents: any[];
    links: any[];
    maps: any[];
    pictures: any[];
    sketches: any[];
    models: any[];
    statistic: Statistic;
}

export interface FormRepeatingServerFormat extends FormFullServerFormat {
    repeatingfields: Record<string, FormFieldDictionary>;
}

export interface FormFormatMapping {
    minimal: FormMinimalServerFormat;
    brief: FormBriefServerFormat;
    full: FormFullServerFormat;
    repeating: FormFullServerFormat;
}

export interface ListFormsParams<T> {
    format?: T;
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

export interface ListFormsResponse<T> {
    forms: T[];
    queryDate: string;
    isPaged: boolean;
    page: number;
    hitsPerPage: number;
    totalCount: number;
    totalPages: number;
}

export interface GetFormParams<T> {
    format?: T;
}

export type ListFormFilesResponse = FileServer[];

export interface IRepeatingUnitTab {
    operation?: 'create' | 'update' | 'delete';
    position?: number;
    fields?: FormFieldDictionary;
}

export interface FormBinaryContent {
    filename?: string;
    id?: string;
    remark?: string;
    hideInPDF?: boolean;
    readonly?: boolean;
    content?: string;
    contentFilename?: string;
    operation?: 'create' | 'update' | 'delete';
}

export interface SimpleAPIData {
    culture?: string;
    title?: string;
    owner?: string;
    group?: string;
    feedback?: string;
    fields?: FormFieldDictionary;
    repeatingUnits?: Record<string, IRepeatingUnitTab[]>;
    pictures?: FormBinaryContent[];
    documents?: FormBinaryContent[];
    audio?: FormBinaryContent[];
}
