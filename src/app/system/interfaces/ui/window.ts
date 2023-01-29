import { Position } from "./position";
import { Size } from "./size";
import { Process } from "../core/process";

export interface Window{
    config: Required<WindowConfiguration>
    position: Position;
    size: Size;
    maximized: boolean;
    minimized: boolean;
    process: Process;
}

export class DefaultWindow implements Window{
    config = new DefaultWindowConfiguration();
    position = {
        x: 20,
        y: 20,
    };
    size = {
        width: 600,
        height: 400,
    };
    maximized = false;
    minimized = false;

    constructor(public process: Process){}
}

export interface ConfigureWindow{
    configureWindow(): WindowConfiguration;
}

export interface WindowConfiguration{
    minWidth?: number;
    minHeight?: number;
}

export class DefaultWindowConfiguration implements Required<WindowConfiguration>{
    minWidth = 300;
    minHeight = 100;
}
