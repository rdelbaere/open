import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountManager } from "../services/account.manager";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private accountManager: AccountManager){}

    canActivate(): boolean {
        if(this.accountManager.isAuthenticated()){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
