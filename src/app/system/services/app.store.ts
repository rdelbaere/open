import { Injectable, Type } from '@angular/core';
import { App, AppRuntimes } from "../interfaces/core/app";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AppStore{
    private subject: BehaviorSubject<App[]> = new BehaviorSubject<App[]>([]);
    private apps: App[] = [
        {
            name: "Navigateur",
            icon: "public",
            color: "#00b894",
            installed: true,
            runtime: '',
        },
        {
            name: "Texte",
            icon: "description",
            color: "#0984e3",
            installed: true,
            runtime: '',
        },
        {
            name: "Musique",
            icon: "graphic_eq",
            color: "#d63031",
            installed: true,
            runtime: '',
        },
        {
            name: "Calculette",
            icon: "calculate",
            color: "#b71540",
            installed: true,
            runtime: 'calculator',
        },
        {
            name: "Paramètres",
            icon: "settings",
            color: "#b2bec3",
            installed: true,
            runtime: '',
        },
    ];

    constructor(){
        this.initialize();
    }

    initialize(){
        // TODO - Get data from backend
        this.subject.next(this.apps);
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
