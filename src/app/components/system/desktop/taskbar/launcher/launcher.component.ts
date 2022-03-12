import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { App } from "../../../../../interfaces/system/app";
import { AppService } from "../../../../../services/system/app.service";

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

    constructor(private renderer: Renderer2, private appService: AppService){
        this.setupPanelAutoclose();

        this.appService.getInstalled().subscribe(installedApps => {
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
}
