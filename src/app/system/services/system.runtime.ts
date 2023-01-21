import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { BackendService } from "./backend.service";
import { System, SystemConfiguration } from "../interfaces/core/system";
import { NotificationCenter } from "./notification.center";
import { NotificationType } from "../interfaces/core/notification";

@Injectable({
    providedIn: 'root'
})
export class SystemRuntime {
    private system: System;
    private configurationSubject: BehaviorSubject<SystemConfiguration>;

    constructor(private backendService: BackendService, private notificationCenter: NotificationCenter) {}

    boot(systemId: number): Observable<void>{
        const subject = new Subject<void>();

        this.backendService.get(`/systems/${systemId}`).subscribe(payload => {
            this.system = payload.data;
            this.configurationSubject = new BehaviorSubject<SystemConfiguration>(this.system.configuration);
            subject.next();
        });

        return subject.asObservable();
    }

    observeConfiguration(): Observable<SystemConfiguration> {
        return this.configurationSubject.asObservable();
    }

    updateConfiguration(key: string, value: string) {
        if(this.system.configuration[key] === undefined) {
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
}
