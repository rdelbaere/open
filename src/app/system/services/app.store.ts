import { Injectable, Type } from '@angular/core';
import { App, AppRuntimes } from "../interfaces/core/app";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BackendService } from "./backend.service";

@Injectable({
    providedIn: 'root'
})
export class AppStore{
    private subject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>([]);
    private apps: App[] = [];

    constructor(private backendService: BackendService){
        this.initialize();
    }

    initialize(){
        this.backendService.get('/apps')
            .subscribe(payload => {
                this.apps = payload.data;
                this.subject.next(this.apps);
            });
    }

    getAll(): Observable<App[]>{
        return this.subject.asObservable();
    }

    getInstalled(): Observable<App[]>{
        return this.subject.asObservable().pipe(
            map(apps => apps.filter(app => app.installed))
        );
    }

    getRuntime(app: App): Type<any> {
        return AppRuntimes[app.runtime];
    }
}
