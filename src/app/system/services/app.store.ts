import { Injectable } from '@angular/core';
import { App } from "../interfaces/core/app";
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
        },
        {
            name: "Texte",
            icon: "description",
            color: "#0984e3",
            installed: true,
        },
        {
            name: "Musique",
            icon: "graphic_eq",
            color: "#d63031",
            installed: true,
        },
        {
            name: "Paramètres",
            icon: "settings",
            color: "#b2bec3",
            installed: true,
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
}
