import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Process } from "../interfaces/core/process";
import { App } from "../interfaces/core/app";
import { WindowManager } from "./window.manager";

@Injectable({
    providedIn: 'root'
})
export class TaskManager{
    private subject: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
    private tasks: Process[] = [];

    constructor(private windowManager: WindowManager){}

    getAll(): Observable<Process[]>{
        return this.subject.asObservable();
    }

    run(activity: App){
        const process = {
            pid: this.tasks.length + 1,
            activity: activity,
            createdAt: new Date(),
        };
        this.windowManager.open(process);

        this.tasks.push(process);
        this.subject.next(this.tasks);
    }

    kill(process: Process){
        this.windowManager.closeAll(process);

        const index = this.tasks.indexOf(process);
        if(index >= 0){
            this.tasks.splice(index, 1);
        }

        this.subject.next(this.tasks);
    }
}
