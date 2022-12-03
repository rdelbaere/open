import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppCenterComponent } from "../../apps/app-center/app-center.component";
import { MaterialModule } from "./material.module";
import { CalculatorComponent } from "../../apps/calculator/calculator.component";

@NgModule({
    declarations: [
        AppCenterComponent,
        CalculatorComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
})
export class AppsModule { }
