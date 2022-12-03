import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { BackendService } from "./backend.service";
import { Credentials } from "../interfaces/backend/credentials";
import { AccountSession } from "../interfaces/core/account";
import { TokenUtil } from "./util/token.util";

@Injectable({
    providedIn: 'root'
})
export class AccountManager {
    private static storageKey: string = 'open-session';
    private static session: AccountSession|null;

    constructor(private backend: BackendService, private tokenUtil: TokenUtil){
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
            const decodedSession = JSON.parse(stored);
            if(this.tokenUtil.isExpired(decodedSession.token)){
                this.clearStoredSession();
            }else{
                AccountManager.session = decodedSession;
            }
        }
    }

    private clearStoredSession(): void {
        localStorage.removeItem(AccountManager.storageKey);
    }

    static getToken(): string {
        return AccountManager.session?.token ?? "";
    }
}
