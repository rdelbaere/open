import { Injectable, Type } from '@angular/core';
import { App, AppRuntimes } from "../interfaces/core/app";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BackendService } from "./backend.service";
import { CoreSystemService } from "./util/core-system.service";

@Injectable({
    providedIn: 'root'
})
export class AppCenter extends CoreSystemService{
    private subject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>([]);
    private apps: App[] = [];

    constructor(private backendService: BackendService){
        super();
        this.initialize();
    }

    initialize(){
        this.backendService.get('/apps').subscribe(payload => {
            this.apps = payload.data;
            this.subject.next(this.apps);
            this.ready();
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

    install(app: App) {
        return this.backendService.post('/apps/' + app.id + '/install').pipe(
            map(response => this.update(response.data))
        );
    }

    uninstall(app: App) {
        return this.backendService.post('/apps/' + app.id + '/uninstall').pipe(
            map(response => this.update(response.data))
        );
    }

    private update(app: App){
        for(const i in this.apps){
            if(this.apps[i].id === app.id){
                this.apps[i] = app;
            }
        }

        this.subject.next(this.apps);
    }
}
