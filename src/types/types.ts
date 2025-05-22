export type RequestType = (
    obj: XhrRequest
) => Promise<XMLHttpRequest | FetchResponse<any>>;

export interface HybridFormsClientConfig {
    baseUrl: string;
    clientId: string;
    user?: string;
    password?: string;
    token?: string;
    xhr?: (obj: XhrRequest) => Promise<XMLHttpRequest>;
}

export interface XhrRequest {
    url: string;
    withCredentials?: boolean;
    type?: string;
    data?: any;
    headers?: Record<string, string>;
    user?: string;
    password?: string;
    responseType?: XMLHttpRequestResponseType;
}

export interface FetchResponse<T> {
    status: number;
    statusText: string;
    response: T;
    responseURL: string;
    getAllResponseHeaders: () => string;
}

export interface SigninResponse {
    access_token: string;
    token_type: string;
    expires_in?: number;
    resource?: string;
    refresh_token?: string;
    refresh_token_expires_in?: number;
    id_token?: string;
}
