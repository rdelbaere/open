import { Type } from "@angular/core";

export interface State{
    name: string,
    component: Type<any>,
    default?: boolean
}
