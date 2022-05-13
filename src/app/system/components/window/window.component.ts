import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CdkDragEnd, CdkDragStart, DragRef } from "@angular/cdk/drag-drop";
import { Window } from "../../interfaces/ui/window";
import { WindowManager } from "../../services/window.manager";
import { TaskManager } from "../../services/task.manager";
import { Size } from "../../interfaces/ui/size";

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent{
    @ViewChild('window') element: ElementRef;
    @Input('window') win: Window;

    constructor(
        private taskManager: TaskManager,
        private windowManager: WindowManager
    ){}

    maximize(){
        this.windowManager.maximize(this.win);
    }

    minimize(){
        this.windowManager.minimize(this.win);
    }

    close(){
        this.taskManager.kill(this.win.process);
    }

    drag(e: CdkDragStart){
        if(this.win.maximized){
            this.attachToCursorForDragging(e.source._dragRef);
            this.windowManager.demaximize(this.win);
        }
    }

    move(event: CdkDragEnd){
        const movedTo = event.source.getFreeDragPosition();
        this.windowManager.upodatePostion(this.win, {
            x: this.win.position.x + movedTo.x,
            y: this.win.position.y + movedTo.y,
        });

        event.source.reset();
    }

    buildStyle(){
        if(this.win.minimized){
            return {
                display: 'none',
            };
        }

        if(this.win.maximized){
            return {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }

        return {
            top: this.win.position.y + 'px',
            left: this.win.position.x + 'px',
            width: this.win.size.width + 'px',
            height: this.win.size.height + 'px',
        };
    }

    attachToCursorForDragging(dragRef: DragRef){
        const mousePosition = dragRef['_lastKnownPointerPosition'];
        const relativePosition = mousePosition.x * 100 / this.element.nativeElement.offsetWidth;
        const absolutePosition = relativePosition * this.win.size.width / 100;
        this.windowManager.upodatePostion(this.win, {
            x: mousePosition.x - absolutePosition,
            y: 0,
        });

        // Fix boundary rect
        dragRef['_boundaryRect'].left = -this.win.position.x;
        dragRef['_boundaryRect'].right = this.element.nativeElement.offsetWidth - this.win.position.x;
    }

    resize($event: Size) {
        this.windowManager.updateSize(this.win, $event);
    }
}
