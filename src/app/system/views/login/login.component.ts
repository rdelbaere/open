import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { AccountManager } from "../../services/account.manager";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });
    loading: boolean = false;

    constructor(private router: Router, private accountManager: AccountManager){}

    login(){
        this.loading = true;
        this.accountManager.authenticate(this.loginForm.value)
            .subscribe(() => {
                this.loading = false;
                this.router.navigate(['/']);
            }, err => {
                this.loading = false;
                console.log(err); // TODO - Manage errors
            });
    }
}
