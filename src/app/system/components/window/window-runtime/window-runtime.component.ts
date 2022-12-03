import { Component, ComponentFactoryResolver, AfterViewInit, ViewContainerRef, ViewChild, Input, ComponentRef } from '@angular/core';
import { Window } from "../../../interfaces/ui/window";
import { AppCenter } from "../../../services/app.center";

@Component({
    selector: 'app-window-runtime',
    templateUrl: './window-runtime.component.html',
    styleUrls: ['./window-runtime.component.scss']
})
export class WindowRuntimeComponent implements AfterViewInit {
    @Input('window') window: Window;
    @ViewChild('runtime', {read: ViewContainerRef}) runtime: ViewContainerRef;
    componentRef: ComponentRef<any>;

    constructor(private resolver: ComponentFactoryResolver, private appCenter: AppCenter){}

    ngAfterViewInit(){
        this.loadRuntime();
    }

    loadRuntime(){
        const componentType = this.appCenter.getRuntime(this.window.process.activity);
        const factory = this.resolver.resolveComponentFactory(componentType);
        this.componentRef = this.runtime.createComponent(factory);
        this.componentRef.location.nativeElement.classList.add('window-runtime-component');
    }

}
