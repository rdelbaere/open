import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FilesystemManager } from "../../../../system/services/filesystem.manager";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-apps-file-explorer-actions-create-folder',
    templateUrl: './create-folder.component.html',
    styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent {
    folderForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required])
    });

    constructor(
        private filesystemManager: FilesystemManager,
        @Inject(MAT_DIALOG_DATA) private payload: {path: string}
    ) {}

    create() {
        if(this.folderForm.invalid) {
            return;
        }

        this.filesystemManager.createDirectory({
            name: this.folderForm.controls.name.value ?? '',
            path: this.payload.path,
        });
    }
}
