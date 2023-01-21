import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FileExplorerComponent } from "./file-explorer.component";
import { MaterialModule } from "../../system/modules/material.module";

@NgModule({
    declarations: [
        FileExplorerComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
})
export class FileExplorerModule { }
