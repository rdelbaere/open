import { Component } from '@angular/core';
import { AppCenter } from '../../system/services/app.center'
import { App } from "../../system/interfaces/core/app";
import { NotificationCenter } from "../../system/services/notification.center";
import { NotificationType } from "../../system/interfaces/core/notification";
import { ConfigureWindow, WindowConfiguration } from "../../system/interfaces/ui/window";

@Component({
    selector: 'app-apps-app-center',
    templateUrl: './app-center.component.html',
    styleUrls: ['./app-center.component.scss']
})
export class AppCenterComponent implements ConfigureWindow {
    readonly actions = {
        install: `installé`,
        uninstall: 'désinstallé',
    };

    apps: App[];
    processing: App | null;
    filter = "";

    constructor(private appCenter: AppCenter, private notificationCenter: NotificationCenter) {
        this.appCenter.getAll().subscribe(apps => {
            this.apps = apps;
        });
    }

    configureWindow(): WindowConfiguration {
        return { minWidth: 600, minHeight: 400 };
    }

    install(app: App): void {
        this.processing = app;
        this.appCenter.install(app).subscribe({
            next: () => this.onSuccess(app, this.actions.install),
            error: () => this.onError(app, this.actions.install),
        });
    }

    uninstall(app: App): void {
        this.processing = app;
        this.appCenter.uninstall(app).subscribe({
            next: () => this.onSuccess(app, this.actions.uninstall),
            error: () => this.onError(app, this.actions.uninstall),
        });
    }

    private onSuccess(app: App, action: string) {
        this.notificationCenter.dispatch({
            type: NotificationType.success,
            message: `L'application ${app.name} a été ${action}`,
        });
        this.processing = null;
    }

    private onError(app: App, action: string) {
        this.notificationCenter.dispatch({
            type: NotificationType.error,
            message: `L'application ${app.name} n'a pas pu être ${action}`,
        });
        this.processing = null;
    }
}
