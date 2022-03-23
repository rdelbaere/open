import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Process, ProcessEvent, ProcessEventType } from "../../interfaces/system/process";
import { App } from "../../interfaces/system/app";
import { DefaultWindow } from "../../interfaces/ui/window";

@Injectable({
  providedIn: 'root'
})
export class TaskManager{
    private subject: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
    private tasks: Process[] = [];
    private dispatcher: EventEmitter<ProcessEvent> = new EventEmitter();

    constructor(){}

    getAll(): Observable<Process[]>{
        return this.subject.asObservable();
    }

    run(activity: App){
        const process = {
            pid: this.tasks.length + 1,
            activity: activity,
            window: new DefaultWindow(),
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

    dispatch(type: ProcessEventType, process: Process, data: any = {}){
        this.dispatcher.emit({
            type: type,
            process: process,
            data: data,
        });
    }

    listen(type: ProcessEventType, process?: Process){
        return this.dispatcher.pipe(
            filter(event => {
                if(process && event.process !== process){
                    return false;
                }

                return event.type === type;
            })
        );
    }
}
