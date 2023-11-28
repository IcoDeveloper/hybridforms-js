import { getUrl } from '@/lib/helper';
import { FormServerFormat, SimpleAPIData } from '@/types/formTypes';
import { BaseController } from './BaseController';

export class SimpleAPIController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async post(
        formID: string,
        data: SimpleAPIData
    ): Promise<FormServerFormat> {
        const request = await this.request({
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
        return request.response;
    }

    public async put(
        formID: string,
        itemID: string,
        data: SimpleAPIData
    ): Promise<FormServerFormat> {
        const request = await this.request({
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
        return request.response;
    }
}
