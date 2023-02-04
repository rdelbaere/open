import { Directive, HostListener, Input } from '@angular/core';
import { ContextMenuContainerComponent } from "./context-menu-container/context-menu-container.component";

@Directive({
  selector: '[sdkContextMenuTrigger]'
})
export class ContextMenuTriggerDirective {
    @Input() sdkContextMenuTrigger: ContextMenuContainerComponent;

    @HostListener('contextmenu', ['$event'])
    open(event: MouseEvent){
        event.preventDefault();
        event.stopPropagation();

        this.sdkContextMenuTrigger.open({
            x: event.clientX,
            y: event.clientY
        });
    }
}
