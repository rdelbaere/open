import { Component } from '@angular/core';
import { TaskManager } from "../../../../../services/system/task.manager";
import { Process, ProcessEventType } from "../../../../../interfaces/system/process";

@Component({
    selector: 'app-desktop-taskbar-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
    tasks: Process[];

    constructor(private taskManager: TaskManager){
        this.taskManager.getAll().subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    focus(process: Process){
        this.taskManager.dispatch(ProcessEventType.focus, process, {
            withMinimize: true,
        });
    }
}
