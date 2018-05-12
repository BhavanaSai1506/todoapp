import {HttpHeaders} from "@angular/common/http";

export interface ICustomHeadersOptions {
    token?: string;
    email?: string;
}

export class ApiCustomHeaders {

    public static getHeaders(headers?: HttpHeaders, options?: ICustomHeadersOptions): HttpHeaders {

        let header = (headers || new HttpHeaders());

        if (!header.has('Content-Type')) {
            header = header.append('Content-Type', 'application/json');
        }

        if (options && options.token && !header.has('Authorization')) {
            header = header.append('Authorization', options.token);
        }

        return header;
    }
}