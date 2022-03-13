import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CdkDragEnd, CdkDragStart, DragRef } from "@angular/cdk/drag-drop";
import { Process, ProcessEventType } from "../../../interfaces/system/process";
import { TaskManager } from "../../../services/system/task.manager";
import { Window } from "../../../interfaces/ui/window";

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit{
    @ViewChild('window') element: ElementRef;
    @Input('process') process: Process;
    window: Window;

    constructor(private taskManager: TaskManager){}

    ngOnInit(){
        this.window = this.process.window;
        this.setupEvents();
    }

    setupEvents(){
        this.taskManager.listen(ProcessEventType.minimize, this.process).subscribe(() => {
            this.minimize();
        });
    }

    maximize(){
        this.window.maximized = !this.window.maximized;
    }

    minimize(){
        this.window.minimized = !this.window.minimized;

        if(this.window.minimized){
            this.taskManager.dispatch(ProcessEventType.minimized, this.process);
        }
    }

    close(){
        this.taskManager.kill(this.process);
    }

    drag(e: CdkDragStart){
        if(this.window.maximized){
            this.attachToCursorForDragging(e.source._dragRef);
            this.window.maximized = false;
        }
    }

    move(event: CdkDragEnd){
        const movedTo = event.source.getFreeDragPosition();
        this.window.position.x = this.window.position.x + movedTo.x;
        this.window.position.y = this.window.position.y + movedTo.y;

        event.source.reset();
    }

    buildStyle(){
        if(this.window.minimized){
            return {
                display: 'none',
            };
        }

        if(this.window.maximized){
            return {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            };
        }

        return {
            top: this.window.position.y + 'px',
            left: this.window.position.x + 'px',
            width: this.window.size.width + 'px',
            height: this.window.size.height + 'px',
        };
    }

    attachToCursorForDragging(dragRef: DragRef){
        const mousePosition = dragRef['_lastKnownPointerPosition'];
        const relativePosition = mousePosition.x * 100 / this.element.nativeElement.offsetWidth;
        const absolutePosition = relativePosition * this.window.size.width / 100;
        this.window.position.x = mousePosition.x - absolutePosition;
        this.window.position.y = 0;

        // Fix boundary rect
        dragRef['_boundaryRect'].left = -this.window.position.x;
        dragRef['_boundaryRect'].right = this.element.nativeElement.offsetWidth - this.window.position.x;
    }
}
