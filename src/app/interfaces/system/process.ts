import { App } from "./app";
import { Window } from "../ui/window";

export interface Process{
    pid: number;
    activity: App;
    window: Window;
    createdAt: Date;
}

export interface ProcessEvent{
    type: ProcessEventType,
    process: Process,
    data: any,
}

export enum ProcessEventType{
    focus,
    minimize,
    minimized,
}
