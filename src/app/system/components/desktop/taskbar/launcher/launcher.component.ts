import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { App } from "../../../../interfaces/core/app";
import { AppStore } from "../../../../services/app.store";
import {TaskManager} from "../../../../services/task.manager";
import { AccountManager } from "../../../../services/account.manager";

@Component({
  selector: 'app-desktop-taskbar-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss']
})
export class LauncherComponent {
    @ViewChild('panel') panelElement: ElementRef;
    @ViewChild('panelTrigger') panelTriggerElement: ElementRef;
    panelVisible: boolean = false;

    installedApps: App[];

    constructor(
        private renderer: Renderer2,
        private accountManager: AccountManager,
        private appStore: AppStore,
        private taskManager: TaskManager
    ){
        this.setupPanelAutoclose();

        this.appStore.getInstalled().subscribe(installedApps => {
            this.installedApps = installedApps;
        });
    }

    setupPanelAutoclose(){
        this.renderer.listen('window', 'click', e => {
            if(e.target != this.panelElement.nativeElement && e.target != this.panelTriggerElement.nativeElement){
                this.closePanel();
            }
        });
    }

    togglePanel(){
        this.panelVisible = !this.panelVisible;
    }

    closePanel(){
        this.panelVisible = false;
    }

    launch(app: App){
        this.taskManager.run(app);
    }

    logout(){
        this.accountManager.logout();
    }
}
