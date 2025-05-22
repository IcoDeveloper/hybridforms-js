import { getUrl, paramsFromObject } from '../lib/helper';
import {
    CatalogListResponse,
    DeleteCatalogResponse,
    ExportCatalogMapping,
    ExportCatalogParams,
    GetCatalogParams,
    GetCatalogResponse
} from '../types/catalogTypes';
import { FetchResponse } from '../types/types';
import { BaseController } from './BaseController';

export class CatalogsController extends BaseController {
    protected init(): void {
        this.basePath = '/api/catalogs';
    }

    public async listCatalogs(): Promise<FetchResponse<CatalogListResponse[]>> {
        const response = await this.request({
            url: getUrl(`${this.basePath}`, this.config.baseUrl),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async getCatalog(
        catalogName: string,
        params: GetCatalogParams = {}
    ): Promise<FetchResponse<GetCatalogResponse>> {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${catalogName}`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: 'json'
        });
        return response;
    }

    public async exportCatalog<T extends keyof ExportCatalogMapping = never>(
        catalogName: string,
        params: ExportCatalogParams<T> = {}
    ): Promise<
        FetchResponse<
            ExportCatalogMapping[T] extends null
                ? string
                : ExportCatalogMapping[T]
        >
    > {
        const response = await this.request({
            url: getUrl(
                `${this.basePath}/${catalogName}/export`,
                this.config.baseUrl,
                paramsFromObject(params)
            ),
            type: 'GET',
            responseType: params?.format === 'json' ? 'json' : 'text'
        });
        return response;
    }

    public async deleteCatalog(
        catalogName: string
    ): Promise<FetchResponse<DeleteCatalogResponse>> {
        const response = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'DELETE',
            responseType: 'json'
        });
        return response;
    }

    public async createCatalog(
        catalogName: string,
        data: string | object
    ): Promise<FetchResponse<string[]>> {
        let headers = {};
        if (typeof data === 'object') {
            headers = {
                'Content-Type': 'application/json'
            };
            data = JSON.stringify(data);
        }
        const response = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'POST',
            responseType: 'json',
            headers,
            data
        });
        return response;
    }

    public async updateCatalog(
        catalogName: string,
        data: string | object
    ): Promise<FetchResponse<string[]>> {
        let headers = {};
        if (typeof data === 'object') {
            headers = {
                'Content-Type': 'application/json'
            };
            data = JSON.stringify(data);
        }
        const response = await this.request({
            url: getUrl(`${this.basePath}/${catalogName}`, this.config.baseUrl),
            type: 'PUT',
            responseType: 'json',
            headers,
            data
        });
        return response;
    }
}
