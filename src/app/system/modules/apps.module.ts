import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppCenterComponent } from "../../apps/app-center/app-center.component";
import { MaterialModule } from "./material.module";
import { CalculatorComponent } from "../../apps/calculator/calculator.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [
        AppCenterComponent,
        CalculatorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule,
    ],
})
export class AppsModule { }
