import { Position } from "./position";
import { Size } from "./size";

export interface Window{
    position: Position;
    size: Size;
    maximized: boolean;
    minimized: boolean;
}

export class DefaultWindow implements Window{
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
}
