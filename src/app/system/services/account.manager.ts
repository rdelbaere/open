import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";
import { AccountSession } from "../interfaces/core/account";

@Injectable({
    providedIn: 'root'
})
export class AccountManager {
    private static storageKey: string = 'open-session';
    private static session: AccountSession;

    constructor(private backend: BackendService){
        this.reloadSession();
    }

    authenticate(credentials: Credentials): Observable<boolean>{
        return this.backend.post('/auth', credentials, {withAuthentication: false})
            .pipe(
                map(payload => this.startSession(payload.data))
            );
    }

    isAuthenticated(): boolean {
        return !!AccountManager.session;
    }

    private startSession(session: AccountSession): boolean{
        AccountManager.session = session;
        this.storeSession();
        return true;
    }

    private storeSession(): void {
        localStorage.setItem(AccountManager.storageKey, JSON.stringify(AccountManager.session))
    }

    private reloadSession(): void {
        const stored = localStorage.getItem(AccountManager.storageKey);
        if(stored){
            AccountManager.session = JSON.parse(stored);
        }
    }

    static getToken(): string {
        return AccountManager.session.token;
    }
}
