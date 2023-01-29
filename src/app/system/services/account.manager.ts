import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";
import { AccountSession, AccountUser } from "../interfaces/core/account";
import { TokenUtil } from "./util/token.util";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AccountManager {
    private static storageKey = 'open-session';
    private static session: AccountSession|null;

    constructor(
        private router: Router,
        private backend: BackendService,
        private tokenUtil: TokenUtil
    ){
        this.reloadSession();
    }

    authenticate(credentials: Credentials): Observable<boolean>{
        return this.backend.post('/auth', credentials, {withAuthentication: false})
            .pipe(
                map(payload => this.startSession(payload.data))
            );
    }

    logout(): void {
        AccountManager.session = null;
        this.clearStoredSession();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!AccountManager.session;
    }

    getUser(): AccountUser {
        if(!AccountManager.session){
            throw new Error('No current session');
        }

        return AccountManager.session.user;
    }

    private startSession(session: AccountSession): boolean{
        AccountManager.session = session;
        this.storeSession();
        return true;
    }

    private reloadSession(): void {
        const stored = localStorage.getItem(AccountManager.storageKey);
        if(stored){
            const decodedSession = JSON.parse(stored);
            if(this.tokenUtil.isExpired(decodedSession.token)){
                this.clearStoredSession();
            }else{
                AccountManager.session = decodedSession;
            }
        }
    }

    private storeSession(): void {
        localStorage.setItem(AccountManager.storageKey, JSON.stringify(AccountManager.session))
    }

    private clearStoredSession(): void {
        localStorage.removeItem(AccountManager.storageKey);
    }

    static getToken(): string {
        return AccountManager.session?.token ?? "";
    }
}
