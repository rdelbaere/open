import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppCenterComponent } from "../../apps/app-center/app-center.component";
import { MaterialModule } from "./material.module";

@NgModule({
    declarations: [
        AppCenterComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
})
export class AppsModule { }
