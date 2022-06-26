import { Type } from "@angular/core";
import { CalculatorComponent } from "../../../apps/calculator/calculator.component";

export interface App{
    name: string;
    icon: AppIconMaterial;
    installed: boolean;
    runtime: string;
}

/* ----- Runtime ------ */
type AppRuntime = {
    [key: string]: Type<any>
};

export const AppRuntimes: AppRuntime = {
    calculator: CalculatorComponent,
}

/* ----- Icon ----- */
export interface AppIconMaterial{
    type: 'material';
    name: string;
    color: string;
}
