import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Position } from "../../../interfaces/ui/position";
import { Size } from "../../../interfaces/ui/size";
import { Window } from "../../../interfaces/ui/window";

@Component({
  selector: 'app-window-handle',
  templateUrl: './window-handle.component.html',
  styleUrls: ['./window-handle.component.scss']
})
export class WindowHandleComponent{
    @Input('window') window: Window;
    @Output() resized: EventEmitter<Size> = new EventEmitter<Size>();
    private cursorStartPosition: Position;
    private windowStartSize: Size;
    private onResize: boolean = false;


    startResize($event: MouseEvent) {
        this.cursorStartPosition = {
            x: $event.clientX,
            y: $event.clientY,
        };
        this.windowStartSize = this.window.size;
        this.onResize = true;
    }

    // TODO - Find an alternative to window HostListeners
    @HostListener('window:mousemove', ['$event'])
    resize($event: MouseEvent) {
        if(!this.onResize || this.window.maximized){
            return;
        }

        const newWidth = this.windowStartSize.width + ($event.clientX - this.cursorStartPosition.x);
        const newHeight = this.windowStartSize.height + ($event.clientY - this.cursorStartPosition.y);

        const newSize = {
            width: Math.max(newWidth, 300),
            height: Math.max(newHeight, 100),
        };

        this.resized.emit(newSize);
    }

    @HostListener('window:mouseup', ['$event'])
    stopResize() {
        this.onResize = false;
    }
}
