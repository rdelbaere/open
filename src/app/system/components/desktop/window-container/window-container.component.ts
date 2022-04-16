import { Component, OnInit } from '@angular/core';
import { Window } from "../../../interfaces/ui/window";
import { WindowManager } from "../../../services/window.manager";

@Component({
    selector: 'app-desktop-window-container',
    templateUrl: './window-container.component.html',
    styleUrls: ['./window-container.component.scss']
})
export class WindowContainerComponent implements OnInit{
    windows: Window[] = [];

    constructor(private windowManager: WindowManager){
        this.windowManager.getAll().subscribe(windows => {
            this.windows = windows;
        });
    }

    ngOnInit(){}

    focus(window: Window){
        this.windowManager.focus(window);
    }
}
