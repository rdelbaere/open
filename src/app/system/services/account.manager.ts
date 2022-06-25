import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";

@Injectable({
    providedIn: 'root'
})
export class AccountManager {
    private token: string;

    constructor(private backend: BackendService){}

    authenticate(credentials: Credentials): Observable<boolean>{
        return this.backend.post('/auth', credentials)
            .pipe(
                map(payload => {
                    this.token = payload.data.token;
                    return true;
                })
            );
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }
}
