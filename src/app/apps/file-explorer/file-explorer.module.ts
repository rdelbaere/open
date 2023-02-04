import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FileExplorerComponent } from "./file-explorer.component";
import { MaterialModule } from "../../system/modules/material.module";
import { ContextMenuModule } from "../../sdk/context-menu/context-menu.module";

@NgModule({
    declarations: [
        FileExplorerComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ContextMenuModule,
    ],
})
export class FileExplorerModule { }
