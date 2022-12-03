import { Type } from "@angular/core";
import { CalculatorComponent } from "../../../apps/calculator/calculator.component";
import { AppCenterComponent } from "../../../apps/app-center/app-center.component";

export interface App{
    id: number;
    name: string;
    icon: AppIconMaterial;
    installed: boolean;
    byDefault: boolean;
    runtime: string;
}

/* ----- Runtime ------ */
type AppRuntime = {
    [key: string]: Type<any>
};

export const AppRuntimes: AppRuntime = {
    calculator: CalculatorComponent,
    appcenter: AppCenterComponent,
}

/* ----- Icon ----- */
export interface AppIconMaterial{
    type: 'material';
    name: string;
    color: string;
}
