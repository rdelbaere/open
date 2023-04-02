import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { BackendResponse } from "../interfaces/backend/backend-response";
import { BackendOptions, DefaultBackendOptions } from "../interfaces/backend/backend-options";
import { BackendRequest } from "../interfaces/backend/backend-request";
import { AccountManager } from "./account.manager";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    config: any = environment.backend;

    constructor(private http: HttpClient){}

    get(endpoint: string, options: BackendOptions = {}): Observable<BackendResponse>  {
        const request = this.prepareRequest(endpoint, options);
        const observable = this.http.get<BackendResponse>(request.url, request.options);
        return this.prepareObservable(observable);
    }

    post(endpoint: string, payload: any = {}, options: BackendOptions = {}): Observable<BackendResponse> {
        const request = this.prepareRequest(endpoint, options);
        const observable = this.http.post<BackendResponse>(request.url, payload, request.options);
        return this.prepareObservable(observable);
    }

    patch(endpoint: string, payload: any, options: BackendOptions = {}): Observable<BackendResponse> {
        const request = this.prepareRequest(endpoint, options);
        request.options.headers = request.options.headers.append('Content-Type', 'application/merge-patch+json');
        const observable = this.http.patch<BackendResponse>(request.url, payload, request.options);
        return this.prepareObservable(observable);
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

    private prepareObservable(observable: Observable<BackendResponse>): Observable<BackendResponse> {
        return observable.pipe(
            catchError(err => {
                return throwError({
                    status: false,
                    message: err.error.message ?? 'Une erreur est survenue, veuillez réessayer ultérieurement'
                });
            }),
        );
    }
}
