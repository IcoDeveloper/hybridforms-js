import { getUrl } from '../lib/helper';
import {
    FormDefinitionResponse,
    GroupResponse
} from '../types/formDefinitionTypes';
import { FetchResponse } from '../types/types';
import { BaseController } from './BaseController';

export class FormDefinitionsController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async getFormDefinitions(): Promise<
        FetchResponse<FormDefinitionResponse[]>
    > {
        const response = await this.request({
            url: getUrl(this.basePath, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getFormDefinition(
        formID: string
    ): Promise<FetchResponse<FormDefinitionResponse>> {
        const response = await this.request({
            url: getUrl(`${this.basePath}/${formID}`, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getMyGroups(
        formID: string
    ): Promise<FetchResponse<GroupResponse[]>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/mygroups`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getFormDefinitionFile(
        formID: string,
        filename: string
    ): Promise<FetchResponse<Blob>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/files/${filename}`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'blob'
        });
        return response;
    }

    public async getFormDefinitionStructure(
        formID: string
    ): Promise<FetchResponse<any>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/structure`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }
}
