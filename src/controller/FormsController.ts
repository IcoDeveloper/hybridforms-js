import { getUrl, paramsFromObject } from '../lib/helper';
import {
    FormFormatMapping,
    FormFullServerFormat,
    FormMinimalServerFormat,
    GetFormParams,
    ListFormFilesResponse,
    ListFormsParams,
    ListFormsResponse
} from '../types/formTypes';
import { FetchResponse } from '../types/types';
import { BaseController } from './BaseController';

export class FormsController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async listForms<
        T extends Exclude<keyof FormFormatMapping, 'repeating'> = never
    >(
        formID: string,
        params: ListFormsParams<T> = {}
    ): Promise<
        FetchResponse<
            ListFormsResponse<
                FormFormatMapping[T] extends null
                    ? FormMinimalServerFormat
                    : FormFormatMapping[T]
            >
        >
    > {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getForm<T extends keyof FormFormatMapping = never>(
        formID: string,
        itemID: string,
        params: GetFormParams<T> = {}
    ): Promise<
        FetchResponse<
            FormFormatMapping[T] extends null
                ? FormFullServerFormat
                : FormFormatMapping[T]
        >
    > {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}`,
                this.config.baseUrl,
                paramsFromObject(params ?? {})
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async listFormFiles(
        formID: string,
        itemID: string
    ): Promise<FetchResponse<ListFormFilesResponse>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}/files`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getFormFile(
        formID: string,
        itemID: string,
        filename: string
    ): Promise<FetchResponse<Blob>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}/files/${filename}`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'blob'
        });
        return response;
    }
}
