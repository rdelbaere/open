import { Component } from '@angular/core';
import { Window } from "../../../../interfaces/ui/window";
import { WindowManager } from "../../../../services/window.manager";
import { TaskManager } from "../../../../services/task.manager";

@Component({
    selector: 'app-desktop-taskbar-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
    windows: Window[];

    constructor(private windowManager: WindowManager, private taskManager: TaskManager){
        this.windowManager.getAll().subscribe(windows => {
            this.windows = [...windows];
            this.windows.sort(this.order);
        });
    }

    focus(window: Window){
        this.windowManager.focus(window, true);
    }

    order(a: Window, b: Window){
        if(a.process.createdAt < b.process.createdAt){
            return -1;
        }else if(a.process.createdAt === b.process.createdAt){
            return 0;
        }else{
            return 1;
        }
    }

    closeWindow(window: Window) {
        this.taskManager.kill(window.process);
    }
}
