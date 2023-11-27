import { getUrl } from '../lib/helper';
import {
    FormDefinitionResponse,
    GroupResponse
} from '../types/formDefinitionTypes';
import { BaseController } from './BaseController';

export class FormDefinitionsController extends BaseController {
    protected init(): void {
        this.basePath = `/api/app/${this.config.clientId}/formdefinitions`;
    }

    public async getFormDefinitions(): Promise<FormDefinitionResponse[]> {
        const request = await this.request({
            url: getUrl(this.basePath, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getFormDefinition(
        formID: string
    ): Promise<FormDefinitionResponse> {
        const request = await this.request({
            url: getUrl(`${this.basePath}/${formID}`, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getMyGroups(formID: string): Promise<GroupResponse[]> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/mygroups`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getFormDefinitionFile(
        formID: string,
        filename: string
    ): Promise<Blob> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/files/${filename}`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'blob'
        });
        return request.response;
    }

    public async getFormDefinitionStructure(formID: string): Promise<any> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${formID}/structure`,
                this.config.baseUrl
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }
}
