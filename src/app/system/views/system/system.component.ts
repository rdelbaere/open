import { Component } from '@angular/core';
import { AccountManager } from "../../services/account.manager";
import { SystemRuntime } from "../../services/system.runtime";

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})
export class SystemComponent {
    booted: boolean = false;

    constructor(private accountManager: AccountManager, private systemRuntime: SystemRuntime) {
        this.start();
    }

    start(){
        const user = this.accountManager.getUser();
        this.systemRuntime.boot(user.system.id).subscribe(() => {
            this.booted = true;
        });
    }
}
