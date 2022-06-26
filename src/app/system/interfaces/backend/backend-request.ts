import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface BackendRequest{
    url: string;
    options: {
        observe: 'body',
        headers: HttpHeaders,
        params: HttpParams,
        withAuthentication: boolean,
    };
}
