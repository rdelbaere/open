import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppCenterComponent } from "./app-center.component";
import { MaterialModule } from "../../system/modules/material.module";
import { UtilsModule } from "../../sdk/utils/utils.module";

@NgModule({
    declarations: [
        AppCenterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        UtilsModule,
    ],
})
export class AppCenterModule { }
