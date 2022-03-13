import { App } from "./app";

export interface Process{
    pid: number;
    activity: App;
    createdAt: Date;
}
