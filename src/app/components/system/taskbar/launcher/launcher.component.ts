import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-taskbar-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss']
})
export class LauncherComponent {
    @ViewChild('panel') panelElement: ElementRef;
    @ViewChild('panelTrigger') panelTriggerElement: ElementRef;
    panelVisible: boolean = false;

    // TODO - Dynamize apps list
    installedApps: Array<any> = [
        {
            name: "Navigateur",
            icon: "public",
            color: "#00b894",
        },
        {
            name: "Texte",
            icon: "description",
            color: "#0984e3",
        },
        {
            name: "Musique",
            icon: "graphic_eq",
            color: "#d63031",
        },
        {
            name: "Paramètres",
            icon: "settings",
            color: "#b2bec3",
        },
    ];

    constructor(private renderer: Renderer2){
        this.setupPanelAutoclose();
    }

    setupPanelAutoclose(){
        this.renderer.listen('window', 'click', e => {
            console.log(e.target);

            console.log(this.panelTriggerElement.nativeElement);
            console.log(this.panelElement.nativeElement);
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
