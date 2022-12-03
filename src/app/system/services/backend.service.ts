import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { BackendResponse } from "../interfaces/backend/backend-response";
import { BackendOptions, DefaultBackendOptions } from "../interfaces/backend/backend-options";
import { BackendRequest } from "../interfaces/backend/backend-request";
import { AccountManager } from "./account.manager";

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    config: any = environment.backend;

    constructor(private http: HttpClient){}

    post(endpoint: string, payload: any = {}, options: BackendOptions = {}): Observable<BackendResponse> {
        const request = this.prepareRequest(endpoint, options);
        return this.http.post<BackendResponse>(request.url, payload, request.options);
    }

    get(endpoint: string, options: BackendOptions = {}) {
        const request = this.prepareRequest(endpoint, options);
        return this.http.get<BackendResponse>(request.url, request.options);
    }

    private prepareRequest(endpoint: string, options: BackendOptions = {}): BackendRequest {
        const resolvedOptions = this.resolveOptions(options);

        return {
            url: this.buildUrl(endpoint),
            options: {
                headers: this.buildHeaders(resolvedOptions),
                params: resolvedOptions.params ?? new HttpParams(),
                observe: 'body',
                withAuthentication: resolvedOptions.withAuthentication ?? true,
            },
        };
    }

    private buildUrl(endpoint: string): string {
        return this.config.url + endpoint;
    }

    private buildHeaders(options: BackendOptions): HttpHeaders {
        let headers = new HttpHeaders({});

        if(options.withAuthentication){
            headers = headers.append('Authorization', 'Bearer ' + AccountManager.getToken());
        }

        return headers;
    }

    private resolveOptions(options: BackendOptions): BackendOptions {
        return {...DefaultBackendOptions, ...options};
    }
}
