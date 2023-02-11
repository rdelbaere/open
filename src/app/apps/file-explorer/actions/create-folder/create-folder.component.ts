import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-apps-file-explorer-actions-create-folder',
    templateUrl: './create-folder.component.html',
    styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent {
    folderForm = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    create() {
        if(this.folderForm.invalid) {
            return;
        }

        console.log(this.folderForm.value);
    }
}
