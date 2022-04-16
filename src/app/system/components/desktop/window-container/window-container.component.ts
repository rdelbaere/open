import { Component, OnInit } from '@angular/core';
import { TaskManager } from "../../../services/task.manager";
import { Process, ProcessEvent, ProcessEventType } from "../../../interfaces/core/process";

@Component({
    selector: 'app-desktop-window-container',
    templateUrl: './window-container.component.html',
    styleUrls: ['./window-container.component.scss']
})
export class WindowContainerComponent implements OnInit{
    tasks: Process[] = [];

    constructor(private taskManager: TaskManager){
        this.taskManager.getAll().subscribe(tasks => {
            this.updateTasks(tasks);
        });
    }

    ngOnInit(){
        this.setupEvents();
    }

    setupEvents(){
        this.taskManager.listen(ProcessEventType.focus).subscribe(event => {
            this.onFocus(event);
        });

        this.taskManager.listen(ProcessEventType.minimized).subscribe(event => {
            this.onMinimized(event);
        });
    }

    updateTasks(tasks: Process[]){
        this.tasks = this.tasks.filter(process => {
            return tasks.includes(process);
        });

        const newTasks = tasks.filter(process => {
            return !this.tasks.includes(process);
        });
        this.tasks.push(...newTasks);
    }

    onFocus(event: ProcessEvent){
        const withMinimize = event.data.hasOwnProperty('withMinimize') && event.data.withMinimize;
        const onTop = this.tasks.indexOf(event.process) === this.tasks.length - 1;
        const minimized = event.process.window.minimized;

        this.push(event.process);
        if(withMinimize && (onTop || minimized)){
            this.taskManager.dispatch(ProcessEventType.minimize, event.process);
        }
    }

    onMinimized(event: ProcessEvent) {
        const index = this.tasks.indexOf(event.process);
        if(index >= 0){
            const element = this.tasks.splice(index, 1);
            this.tasks.unshift(...element);
        }
    }

    push(process: Process){
        const index = this.tasks.indexOf(process);
        if(index >= 0){
            const element = this.tasks.splice(index, 1);
            this.tasks.push(...element);
        }
    }

    focus(process: Process){
        this.taskManager.dispatch(ProcessEventType.focus, process);
    }
}
