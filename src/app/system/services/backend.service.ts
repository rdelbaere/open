import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { BackendResponse } from "../interfaces/backend/backend-response";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    config: any = environment.backend;

    constructor(private http: HttpClient){}

    post(endpoint: string, payload: any = {}): Observable<BackendResponse>{
        const url = this.buildUrl(endpoint);
        return this.http.post<BackendResponse>(url, payload);
    }

    private buildUrl(endpoint: string): string {
        return this.config.url + endpoint;
    }
}
