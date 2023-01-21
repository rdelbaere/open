import { Type } from "@angular/core";
import { CalculatorComponent } from "../../../apps/calculator/calculator.component";
import { AppCenterComponent } from "../../../apps/app-center/app-center.component";
import { SettingsComponent } from "../../../apps/settings/settings.component";
import { PanicComponent } from "../../../apps/panic/panic.component";

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
    panic: PanicComponent,
    settings: SettingsComponent,
}

/* ----- Icon ----- */
export interface AppIconMaterial{
    type: 'material';
    name: string;
    color: string;
}
