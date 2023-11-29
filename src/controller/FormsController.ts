import { getUrl, paramsFromObject } from '../lib/helper';
import {
    GetFormParams,
    GetFormResponse,
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

    public async listForms(
        formID: string,
        params: ListFormsParams = {}
    ): Promise<FetchResponse<ListFormsResponse>> {
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

    public async getForm(
        formID: string,
        itemID: string,
        params: GetFormParams = {}
    ): Promise<FetchResponse<GetFormResponse>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}`,
                this.config.baseUrl,
                paramsFromObject(params)
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
