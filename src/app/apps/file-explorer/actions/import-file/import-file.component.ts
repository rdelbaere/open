import { Component, Inject } from '@angular/core';
import { FilesystemManager } from "../../../../system/services/filesystem.manager";
import { NotificationCenter } from "../../../../system/services/notification.center";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BackendError } from "../../../../system/interfaces/backend/backend-error";
import { NotificationType } from "../../../../system/interfaces/core/notification";
import { NativeFileUtils } from "../../../../sdk/utils/native-file.utils";

@Component({
    selector: 'app-apps-file-explorer-actions-import-file',
    templateUrl: './import-file.component.html',
    styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent {
    fileForm = new FormGroup({
        file: new FormControl<File|null>(null, [Validators.required]),
        name: new FormControl<string>('', [Validators.required])
    });
    fileSource: File;
    loading = false;
    backendError: BackendError;

    constructor(
        private filesystemManager: FilesystemManager,
        private notificationCenter: NotificationCenter,
        private reference: MatDialogRef<ImportFileComponent>,
        @Inject(MAT_DIALOG_DATA) private payload: {path: string}
    ) {}

    handleFile(event: Event) {
        const input = event.target as HTMLInputElement;

        if(!input.files || input.files.length === 0) {
            return;
        }

        this.fileSource = input.files[0];
        console.log(this.fileSource);
        this.fileForm.controls.name.setValue(NativeFileUtils.removeExtension(this.fileSource));
    }

    import() {
        if (this.fileForm.invalid) {
            return;
        }

        this.loading = true;

        this.filesystemManager.importFile({
            path: this.payload.path,
            name: this.fileForm.value.name ?? '',
            file: this.fileSource,
        }).subscribe({
            next: () => {
                this.reference.close();
                this.notificationCenter.dispatch({
                    type: NotificationType.success,
                    message: 'Le fichier a bien été importé',
                });
            },
            error: err => {
                this.backendError = err;
                this.loading = false;
            }
        });
    }

    getFileExtension() {
        return NativeFileUtils.guessExtension(this.fileSource);
    }
}
