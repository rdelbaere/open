import { Component, HostListener } from '@angular/core';
import { Position } from "../../../system/interfaces/ui/position";

@Component({
  selector: 'sdk-context-menu',
  templateUrl: './context-menu-container.component.html',
  styleUrls: ['./context-menu-container.component.scss']
})
export class ContextMenuContainerComponent {
    opened = false;
    position: Position = {x: 0, y: 0};

    open(position: Position){
        this.position = position;
        this.opened = true;
    }

    @HostListener('window:click', ['$event'])
    @HostListener('window:contextmenu', ['$event'])
    close(event: MouseEvent) {
        if (this.opened) {
            event.preventDefault();
            this.opened = false;
        }
    }
}
