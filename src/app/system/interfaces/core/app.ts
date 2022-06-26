import { Type } from "@angular/core";
import { CalculatorComponent } from "../../../apps/calculator/calculator.component";

export interface App{
    name: string;
    icon: any;
    installed: boolean;
    runtime: string;
}

type AppRuntime = {
    [key: string]: Type<any>
};

export const AppRuntimes: AppRuntime = {
    calculator: CalculatorComponent,
}

