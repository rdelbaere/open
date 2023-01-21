import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { AccountManager } from "../../services/account.manager";
import { NotificationCenter } from "../../services/notification.center";
import { NotificationType } from "../../interfaces/core/notification";

@Component({
    selector: 'app-views-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl<string>(''),
        password: new FormControl<string>(''),
    });
    loading: boolean = false;

    constructor(
        private router: Router,
        private accountManager: AccountManager,
        private notificationCenter: NotificationCenter
    ){}

    login(){
        this.loading = true;
        this.accountManager.authenticate(this.loginForm.value)
            .subscribe(() => {
                this.loading = false;
                this.router.navigate(['/']).then(() => {
                    this.notificationCenter.dispatch({
                        type: NotificationType.success,
                        message: "Session ouverte",
                    });
                });
            }, err => {
                this.loading = false;
                this.notificationCenter.dispatch({
                    type: NotificationType.error,
                    message: err.error.message,
                });
            });
    }
}
