import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Position } from "../../../interfaces/ui/position";
import { Size } from "../../../interfaces/ui/size";
import { CdkDragEnd, CdkDragStart, DragRef } from "@angular/cdk/drag-drop";
import { Process } from "../../../interfaces/system/process";
import { TaskManager } from "../../../services/system/task.manager";

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent{
    @ViewChild('window') window: ElementRef;
    @Input('process') process: Process;

    position: Position = {
        x: 20,
        y: 20,
    };
    size: Size = {
        width: 600,
        height: 400,
    }
    maximized: boolean = false;

    constructor(private taskManager: TaskManager){}

    maximize(){
        this.maximized = !this.maximized;
    }

    close(){
        this.taskManager.kill(this.process);
    }

    drag(e: CdkDragStart){
        if(this.maximized){
            this.attachToCursorForDragging(e.source._dragRef);
            this.maximized = false;
        }
    }

    move(event: CdkDragEnd){
        const movedTo = event.source.getFreeDragPosition();
        this.position.x = this.position.x + movedTo.x;
        this.position.y = this.position.y + movedTo.y;

        event.source.reset();
    }

    buildStyle(){
        if(this.maximized){
            return {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }

        return {
            top: this.position.y + 'px',
            left: this.position.x + 'px',
            width: this.size.width + 'px',
            height: this.size.height + 'px',
        };
    }

    attachToCursorForDragging(dragRef: DragRef){
        const mousePosition = dragRef['_lastKnownPointerPosition'];
        const relativePosition = mousePosition.x * 100 / this.window.nativeElement.offsetWidth;
        const absolutePosition = relativePosition * this.size.width / 100;
        this.position.x = mousePosition.x - absolutePosition;
        this.position.y = 0;

        // Fix boundary rect
        dragRef['_boundaryRect'].left = -this.position.x;
        dragRef['_boundaryRect'].right = this.window.nativeElement.offsetWidth - this.position.x;
    }
}
