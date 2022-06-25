import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountManager } from "../services/account.manager";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private accountManager: AccountManager){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.accountManager.isAuthenticated()){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
