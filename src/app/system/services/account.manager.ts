import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";
import { AccountSession } from "../interfaces/core/account";

@Injectable({
    providedIn: 'root'
})
export class AccountManager {
    private session: AccountSession;
    private storageKey: string = 'open-session';

    constructor(private backend: BackendService){
        this.reloadSession();
    }

    authenticate(credentials: Credentials): Observable<boolean>{
        return this.backend.post('/auth', credentials)
            .pipe(
                map(payload => this.startSession(payload.data))
            );
    }

    isAuthenticated(): boolean{
        return !!this.session;
    }

    private startSession(session: AccountSession): boolean{
        this.session = session;
        this.storeSession();
        return true;
    }

    private storeSession(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.session))
    }

    private reloadSession(){
        const stored = localStorage.getItem(this.storageKey);
        if(stored){
            this.session = JSON.parse(stored);
        }
    }
}
