import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, zip } from "rxjs";
import { BackendService } from "./backend.service";
import { DefaultSystemConfiguration, System, SystemConfiguration } from "../interfaces/core/system";
import { NotificationCenter } from "./notification.center";
import { NotificationType } from "../interfaces/core/notification";
import { Router } from "@angular/router";
import { AppCenter } from "./app.center";
import { FilesystemManager } from "./filesystem.manager";

@Injectable({
    providedIn: 'root'
})
export class SystemRuntime {
    private readonly coreServices = [AppCenter, FilesystemManager];
    private system: System;
    private bootSubject = new ReplaySubject<void>(1);
    private configurationSubject: BehaviorSubject<SystemConfiguration> = new BehaviorSubject(new DefaultSystemConfiguration());

    constructor(
        private router: Router,
        private injector: Injector,
        private backendService: BackendService,
        private notificationCenter: NotificationCenter
    ) {}

    boot(systemId: number): Observable<void>{
        this.loadData(systemId);
        return this.bootSubject.asObservable();
    }

    observeConfiguration(): Observable<SystemConfiguration> {
        return this.configurationSubject.asObservable();
    }

    updateConfiguration(key: string, value: string) {
        if (this.system.configuration[key] === undefined) {
            throw new Error(`Configuration key '${key}' does not exist`);
        }

        const updatedConfiguration = Object.assign({}, this.system.configuration);
        updatedConfiguration[key] = value;
        this.backendService.patch(`/systems/${this.system.id}`, {
            configuration: updatedConfiguration,
        }).subscribe({
            next: () => {
                this.system.configuration = updatedConfiguration;
                this.notificationCenter.dispatch({
                    type: NotificationType.success,
                    message: 'Configuration mise à jour'
                });
            },
            error: () => {
                this.configurationSubject.next(this.system.configuration);
                this.notificationCenter.dispatch({
                    type: NotificationType.error,
                    message: 'Une erreur est survenue lors de la mise à jour de la configuration'
                });
            }
        });

        this.configurationSubject.next(updatedConfiguration);
    }

    private loadData(systemId: number) {
        this.backendService.get(`/systems/${systemId}`).subscribe({
            next: payload => {
                this.system = payload.data;
                this.configurationSubject.next(this.system.configuration);
                this.startCoreServices();
            },
            error: () => this.panic()
        });
    }

    // TODO - Manage loading errors
    private startCoreServices() {
        const observables = [];
        for (const service of this.coreServices) {
            const instance = this.injector.get(service);
            observables.push(instance.observeReady());

            if (instance instanceof FilesystemManager) {
                instance.initialize(this.system.filesystem.id);
            }
        }

        zip(...observables).subscribe(() => {
            this.bootSubject.next();
        });
    }

    private panic() {
        this.router.navigate(['panic']);
    }
}
