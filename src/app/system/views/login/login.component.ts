import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AccountManager } from "../../services/account.manager";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private accountManager: AccountManager){}

    login(){
        this.accountManager.authenticate(this.loginForm.value)
            .subscribe(data => console.log(data));
    }
}
