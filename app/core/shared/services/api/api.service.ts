import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {ACCESS_TOKEN_STORAGE_KEY, API_URL} from "@core/shared/constants";
import {ILocalStorage, LocalStorage} from "@core/shared/services/storage";
import {
    ApiCustomHeaders,
    ApiUrls,
    CustomQueryEncoder,
    ICustomHeadersOptions,
    IRequestOptions,
    RequestMethod
} from '@core/shared/services/api';

@Injectable()
export class ApiService {
    private URL: string = API_URL;

    constructor(protected http: HttpClient, @Inject(LocalStorage) private localStorage: ILocalStorage) {
    }

    /**
     * GET request
     * @param {string} path it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<any>}
     */
    public get(path: string, options?: IRequestOptions): Observable<any> {
        return this._request(RequestMethod.Get, path, null, options);
    }

    /**
     * POST request
     * @param {string} path it doesn't need / in front of the end point
     * @param {body} body to sent
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<any>}
     */
    public post(path: string, body?: any, options?: IRequestOptions): Observable<any> {
        return this._request(RequestMethod.Post, path, body, options);
    }

    /**
     * PUT request
     * @param {string} path it doesn't need / in front of the end point
     * @param {body} body to sent
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<any>}
     */
    public put(path: string, body?: any, options?: IRequestOptions): Observable<any> {
        return this._request(RequestMethod.Put, path, body, options);
    }

    /**
     * DELETE request
     * @param {string} path it doesn't need / in front of the end point
     * @param {body} body to sent
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<any>}
     */
    public delete(path: string, body?: any, options?: IRequestOptions): Observable<any> {
        return this._request(RequestMethod.Delete, path, body, options);
    }

    /**
     * PATCH request
     * @param {string} path it doesn't need / in front of the end point
     * @param {body} body to sent
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<any>}
     */
    public patch(path: string, body: any, options?: IRequestOptions): Observable<any> {
        return this._request(RequestMethod.Patch, path, body, options);
    }

    private _request(method: RequestMethod, path: string, body?: string, options?: IRequestOptions): Observable<any> {

        if (!options) {
            options = {} as IRequestOptions;
        }

        const url = this.getUrl(path, options);
        const accessToken = this.getAccessToken();
        const optionHeaders = options ? options.headers : null;
        const headers = this.getHeaders(optionHeaders, {
            token: accessToken,
            email: null
        });

        const params = this.getParams(options.params);

        const optionsToSend = Object.assign(options, {
            url,
            headers,
            body,
            params
        });

        return Observable.create((observer) => {
            return this.http.request(method, url, optionsToSend).subscribe(
                (res) => {
                    observer.next(res);
                    observer.complete();
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 401 || err.status === 403) {
                        console.log('Refresh token needed!');
                    }
                    observer.error(err);
                });
        });
    }

    /**
     * GET User access token from local storage
     * @returns {String}
     */
    public getAccessToken(): string {
        const token = this.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        return (token) ? `${token}` : null;
    }

    /**
     * Set User access token to local storage
     * @param {string} accessToken - access token to save in localstorage
     * @returns {void}
     */
    setAccessToken(accessToken: string): void {
        if (accessToken) {
            this.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, JSON.stringify(accessToken));
        }
    }

    /**
     * GET User refresh token from local storage
     * @returns {String}
     */
    private getRefreshToken(): string {
        const user: any = this.localStorage.getItem('user');
        return (user && user.refreshToken) ? `Bearer ${user.refreshToken}` : null;
    }

    /**
     * GET Full url for request
     * @param {string} path - relative path
     * @param {IRequestOptions} options - options of the request like headers, body, etc.
     * @returns {String}
     */
    private getUrl(path: string, options?: IRequestOptions): string {
        return `${ this.URL }/${ path }`;
    }

    /**
     * GET Headers with all custom headers configured
     * @param {HttpHeaders} headers - optional headers sent in options
     * @param {Object} options - option object that contains token to inject in Authentication header
     * @returns {HttpHeaders}
     */
    private getHeaders(headers?: HttpHeaders, options?: ICustomHeadersOptions): HttpHeaders {
        return ApiCustomHeaders.getHeaders(headers, options);
    }

    /**
     * GET Params for http requests
     * @param {Object} params - object with query params
     * @returns {HttpParams}
     */
    private getParams(params?: any): HttpParams {
        let paramsToSend: HttpParams = new HttpParams({
            encoder: new CustomQueryEncoder()
        });

        if (params) {
            for (const [key, value] of Object.entries(params)) {
                paramsToSend = paramsToSend.append(key, value as string);
            }
        }

        return paramsToSend;
    }

    /**
     * GET Refresh token
     * @returns {Observable<any>}
     */
    public refreshAccessToken(): Observable<any> {
        const url = ApiUrls.REFRESH_TOKEN;
        const refreshToken = this.getRefreshToken();
        const headers = this.getHeaders(null, {
            token: refreshToken
        });

        const options = {
            headers,
            forRootUrl: true
        } as IRequestOptions;

        return Observable.create((observer) => {
            this._request(RequestMethod.Get, url, null, options)
                .subscribe(result => {
                        if (!result || !result.accessToken) {
                            this.setAccessToken(result.accessToken);
                            observer.next(result.accessToken);
                        } else {
                            observer.error('No access token given.');
                        }
                        observer.complete();
                    },
                    err => {
                        observer.error(err);
                    });
        });
    }
}
