import { BaseController } from '@/controller/BaseController';
import { getUrl, paramsFromObject } from '@/lib/helper';
import {
    GetFormParams,
    GetFormResponse,
    ListFormFilesResponse,
    ListFormsParams,
    ListFormsResponse
} from '@/types/formTypes';

export class FormsController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async listForms(
        formID: string,
        params: ListFormsParams = {}
    ): Promise<ListFormsResponse> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getForm(
        formID: string,
        itemID: string,
        params: GetFormParams = {}
    ): Promise<GetFormResponse> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async listFormFiles(
        formID: string,
        itemID: string
    ): Promise<ListFormFilesResponse> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}/files`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getFormFile(
        formID: string,
        itemID: string,
        filename: string
    ): Promise<Blob> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/${itemID}/files/${filename}`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'blob'
        });
        return request.response;
    }
}
