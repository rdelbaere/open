import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppCenterComponent } from "./app-center.component";
import { MaterialModule } from "../../system/modules/material.module";
import { SharedModule } from "../../system/modules/shared.module";

@NgModule({
    declarations: [
        AppCenterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule,
    ],
})
export class AppCenterModule { }
