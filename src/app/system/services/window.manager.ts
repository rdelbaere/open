import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DefaultWindow, Window } from "../interfaces/ui/window";
import { Process } from "../interfaces/core/process";
import { Position } from "../interfaces/ui/position";

@Injectable({
  providedIn: 'root'
})
export class WindowManager{
    private subject: BehaviorSubject<Window[]> = new BehaviorSubject<Window[]>([]);
    private windows: Window[] = [];

    constructor(){}

    getAll(): Observable<Window[]>{
        return this.subject.asObservable();
    }

    dispatch(){
        this.subject.next(this.windows);
    }

    open(process: Process){
        const window = new DefaultWindow(process);
        this.windows.push(window);

        this.dispatch();
    }

    closeAll(process: Process){
        for(let index in this.windows){
            if(this.windows[index].process === process){
                this.windows.splice(parseInt(index), 1);
            }
        }

        this.dispatch();
    }

    focus(window: Window, withMinimize: boolean = false){
        const onTop = this.windows.indexOf(window) === this.windows.length - 1;
        const minimized = window.minimized;

        this.push(window);
        if(withMinimize && (onTop || minimized)){
            this.minimize(window);
        }

        this.dispatch();
    }

    minimize(window: Window){
        window.minimized = !window.minimized;

        if(window.minimized){
            const index = this.windows.indexOf(window);
            if(index >= 0){
                const element = this.windows.splice(index, 1);
                this.windows.unshift(...element);
            }
        }

        this.dispatch();
    }

    maximize(window: Window){
        window.maximized = !window.maximized;
        this.dispatch();
    }

    demaximize(window: Window){
        window.maximized = false;
        this.dispatch();
    }

    upodatePostion(window: Window, position: Position){
        window.position = position;
        this.dispatch();
    }

    private push(window: Window){
        const index = this.windows.indexOf(window);
        if(index >= 0){
            const element = this.windows.splice(index, 1);
            this.windows.push(...element);
        }
    }
}
