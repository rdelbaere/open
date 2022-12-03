import { Component } from '@angular/core';
import { AppCenter } from '../../system/services/app.center'
import { App } from "../../system/interfaces/core/app";
import { NotificationCenter } from "../../system/services/notification.center";
import { NotificationType } from "../../system/interfaces/core/notification";

@Component({
    selector: 'app-apps-app-center',
    templateUrl: './app-center.component.html',
    styleUrls: ['./app-center.component.scss']
})
export class AppCenterComponent {
    apps: App[];
    processing: App|null;

    constructor(private appCenter: AppCenter, private notificationCenter: NotificationCenter) {
        this.appCenter.getAll().subscribe(apps => {
            this.apps = apps;
        });
    }

    install(app: App): void {
        this.processing = app;
        this.appCenter.install(app).subscribe(() => {
            this.notificationCenter.dispatch({
                type: NotificationType.success,
                message: "L'application " + app.name + " à été installée",
            });
            this.processing = null;
        });
    }

    uninstall(app: App): void {
        this.processing = app;
        this.appCenter.uninstall(app).subscribe(() => {
            this.notificationCenter.dispatch({
                type: NotificationType.success,
                message: "L'application " + app.name + " à été désinstallée",
            });
            this.processing = null;
        });
    }
}
