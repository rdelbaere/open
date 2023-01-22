import { Component } from '@angular/core';
import { FilesystemManager } from "../../system/services/filesystem.manager";
import { Filesystem } from "../../system/interfaces/core/filesystem";

@Component({
  selector: 'app-apps-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent {
    filesystem: Filesystem;

    constructor(private filesystemManager: FilesystemManager) {
        this.filesystemManager.observe().subscribe(filesystem => this.filesystem = filesystem);
    }
}
