import { getUrl, paramsFromObject } from '../lib/helper';
import {
    CatalogListResponse,
    DeleteCatalogResponse,
    ExportCatalogParams,
    GetCatalogParams,
    GetCatalogResponse
} from '../types/catalogTypes';
import { BaseController } from './BaseController';

export class CatalogsController extends BaseController {
    protected init(): void {
        this.basePath = '/api/catalogs';
    }

    public async listCatalogs(): Promise<CatalogListResponse[]> {
        const request = await this.request({
            url: getUrl(`${this.basePath}`, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async getCatalog(
        catalogName: string,
        params: GetCatalogParams = {}
    ): Promise<GetCatalogResponse> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${catalogName}`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: 'json'
        });
        return request.response;
    }

    public async exportCatalog(
        catalogName: string,
        params: ExportCatalogParams = {}
    ): Promise<any> {
        const request = await this.request({
            url: getUrl(
                `${this.basePath}/${catalogName}/export`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: params?.format === 'json' ? 'json' : 'text'
        });
        return request.response;
    }

    public async deleteCatalog(
        catalogName: string
    ): Promise<DeleteCatalogResponse> {
        const request = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'DELETE',
            responseType: 'json'
        });
        return request.response;
    }

    public async createCatalog(
        catalogName: string,
        data: string | object
    ): Promise<string[]> {
        let headers = {};
        if (typeof data === 'object') {
            headers = {
                'Content-Type': 'application/json'
            };
            data = JSON.stringify(data);
        }
        const request = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'POST',
            responseType: 'json',
            headers,
            data
        });
        return request.response;
    }

    public async updateCatalog(
        catalogName: string,
        data: string | object
    ): Promise<string[]> {
        let headers = {};
        if (typeof data === 'object') {
            headers = {
                'Content-Type': 'application/json'
            };
            data = JSON.stringify(data);
        }
        const request = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'PUT',
            responseType: 'json',
            headers,
            data
        });
        return request.response;
    }
}
