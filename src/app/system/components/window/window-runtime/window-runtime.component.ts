import { Component, AfterViewInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { Window } from "../../../interfaces/ui/window";
import { AppCenter } from "../../../services/app.center";
import { WindowManager } from "../../../services/window.manager";

@Component({
    selector: 'app-window-runtime',
    templateUrl: './window-runtime.component.html',
    styleUrls: ['./window-runtime.component.scss']
})
export class WindowRuntimeComponent implements AfterViewInit {
    @Input() window: Window;
    @ViewChild('runtime', {read: ViewContainerRef}) runtime: ViewContainerRef;

    constructor(private appCenter: AppCenter, private windowManager: WindowManager){}

    ngAfterViewInit(){
        this.loadRuntime();
    }

    loadRuntime(){
        const componentType = this.appCenter.getRuntime(this.window.process.activity);
        const component = this.runtime.createComponent(componentType);
        component.location.nativeElement.classList.add("window-runtime-component");

        if (typeof component.instance.configureWindow === "function") {
            const configuration = component.instance.configureWindow();
            this.windowManager.updateConfiguration(this.window, configuration);
        }
    }
}
