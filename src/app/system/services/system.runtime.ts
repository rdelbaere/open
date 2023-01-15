import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { BackendService } from "./backend.service";
import { System, SystemConfiguration } from "../interfaces/core/system";

@Injectable({
    providedIn: 'root'
})
export class SystemRuntime {
    private system: System;
    private configurationSubject: BehaviorSubject<SystemConfiguration>;

    constructor(private backendService: BackendService) {}

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
}
