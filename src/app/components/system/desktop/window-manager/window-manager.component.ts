import { Component, OnInit } from '@angular/core';
import { TaskManager } from "../../../../services/system/task.manager";
import { Process } from "../../../../interfaces/system/process";

@Component({
    selector: 'app-desktop-window-manager',
    templateUrl: './window-manager.component.html',
    styleUrls: ['./window-manager.component.scss']
})
export class WindowManagerComponent{
    tasks: Process[];

    constructor(private taskManager: TaskManager){
        this.taskManager.getAll().subscribe(tasks => {
           this.tasks = tasks;
        });
    }

}
