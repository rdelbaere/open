import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FileExplorerComponent } from "./file-explorer.component";
import { MaterialModule } from "../../system/modules/material.module";
import { ContextMenuModule } from "../../sdk/context-menu/context-menu.module";
import { CreateFolderComponent } from './actions/create-folder/create-folder.component';
import { DialogModule } from "../../sdk/dialog/dialog.module";

@NgModule({
    declarations: [
        FileExplorerComponent,
        CreateFolderComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        ContextMenuModule,
        DialogModule,
    ],
})
export class FileExplorerModule { }
