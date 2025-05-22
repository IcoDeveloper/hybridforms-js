import { getUrl } from '../lib/helper';
import { FormFullServerFormat, SimpleAPIData } from '../types/formTypes';
import { FetchResponse } from '../types/types';
import { BaseController } from './BaseController';

export class SimpleAPIController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async post(
        formID: string,
        data: SimpleAPIData
    ): Promise<FetchResponse<FormFullServerFormat>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/sapi`,
                this.config.baseUrl
            ),
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            data: JSON.stringify(data)
        });
        return response;
    }

    public async put(
        formID: string,
        itemID: string,
        data: SimpleAPIData
    ): Promise<FetchResponse<FormFullServerFormat>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/forms/sapi/${itemID}`,
                this.config.baseUrl
            ),
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            data: JSON.stringify(data)
        });
        return response;
    }
}
