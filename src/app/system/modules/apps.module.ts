import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppCenterModule } from "../../apps/app-center/app-center.module";
import { CalculatorModule } from "../../apps/calculator/calculator.module";

@NgModule({
    imports: [
        CommonModule,
        AppCenterModule,
        CalculatorModule,
    ],
})
export class AppsModule { }
