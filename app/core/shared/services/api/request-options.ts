import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface IRequestOptions {
    headers?: HttpHeaders | any;
    observe?: 'body';
    params?: HttpParams | any;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}