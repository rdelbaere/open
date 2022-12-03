import { Position } from "./position";
import { Size } from "./size";
import { Process } from "../core/process";

export interface Window{
    config: ResolvedWindowConfiguration
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

// TODO - Find an alternative to not duplicate this interface
export interface ResolvedWindowConfiguration{
    minWidth: number;
    minHeight: number;
}

export class DefaultWindowConfiguration implements ResolvedWindowConfiguration{
    minWidth = 300;
    minHeight = 100;
}
