import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FilesystemManager } from "../../../../system/services/filesystem.manager";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotificationCenter } from "../../../../system/services/notification.center";
import { NotificationType } from "../../../../system/interfaces/core/notification";
import { BackendError } from "../../../../system/interfaces/backend/backend-error";

@Component({
    selector: 'app-apps-file-explorer-actions-create-folder',
    templateUrl: './create-folder.component.html',
    styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent {
    folderForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required])
    });
    loading = false;
    backendError: BackendError;

    constructor(
        private filesystemManager: FilesystemManager,
        private notificationCenter: NotificationCenter,
        private reference: MatDialogRef<CreateFolderComponent>,
        @Inject(MAT_DIALOG_DATA) private payload: {path: string}
    ) {}

    create() {
        if(this.folderForm.invalid) {
            return;
        }

        this.loading = true;
        this.filesystemManager.createDirectory({
            name: this.folderForm.controls.name.value ?? '',
            path: this.payload.path,
        }).subscribe({
            next: () => {
                this.reference.close();
                this.notificationCenter.dispatch({
                    type: NotificationType.success,
                    message: 'Le dossier a bien été créé',
                });
            },
            error: err => {
                this.backendError = err;
                this.loading = false;
            }
        });
    }
}