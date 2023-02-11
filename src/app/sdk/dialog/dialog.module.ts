import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from "./dialog.service";
import { MaterialModule } from "../../system/modules/material.module";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    providers: [DialogService],
})
export class DialogModule { }
