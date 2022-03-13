import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { Process } from "../../interfaces/system/process";
import {App} from "../../interfaces/system/app";

@Injectable({
  providedIn: 'root'
})
export class TaskManager{
    private subject: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
    private tasks: Process[] = [];

    constructor(){}

    getAll(): Observable<Process[]>{
        return this.subject.asObservable();
    }

    run(activity: App){
        const process = {
            pid: this.tasks.length + 1,
            activity: activity,
            createdAt: new Date(),
        };

        this.tasks.push(process);
        this.subject.next(this.tasks);
    }

    kill(process: Process){
        const index = this.tasks.indexOf(process);
        if(index >= 0){
            this.tasks.splice(index, 1);
        }

        this.subject.next(this.tasks);
    }
}
