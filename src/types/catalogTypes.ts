export interface ModifiedBy {
    id: number;
    title: string;
    upn: string;
    email: string;
    isGroup: boolean;
}

export interface CatalogListResponse {
    name: string;
    count: number;
    modified: string;
    modifiedUtc: string;
    modifiedBy: ModifiedBy;
    hasACL: boolean;
    clientId: number;
    clientName: string;
    remark: string;
    isReachout: boolean;
    version: string;
    XSLFilename: null;
    useXSL: boolean;
    originalFilename: string;
}

export interface ExportCatalogParams {
    format?: 'json' | 'xml' | 'csv' | 'excel';
}

export interface GetCatalogParams {
    $select?: string;
    $orderby?: string;
    $top?: number;
    $filter?: string;
    $skip?: number;
    [key: string]: any;
}

export interface GetCatalogResponse {
    d: ODataResult;
}

export interface ODataResult {
    results: Array<{ [key: string]: string }>;
    __count: number | null;
    __next: number | null;
}

export interface DeleteCatalogResponse {
    deleted: boolean;
}
