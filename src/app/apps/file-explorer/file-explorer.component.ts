import { Component } from '@angular/core';
import { FilesystemManager } from "../../system/services/filesystem.manager";
import { Directory, Filesystem, Resource } from "../../system/interfaces/core/filesystem";
import { FilesystemUtils } from "../../sdk/utils/filesystem.utils";
import { ConfigureWindow, WindowConfiguration } from "../../system/interfaces/ui/window";

@Component({
    selector: 'app-apps-file-explorer',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements ConfigureWindow {
    filesystem: Filesystem;
    currentDirectory: Directory;
    history: Directory[] = [];

    constructor(private filesystemManager: FilesystemManager) {
        this.filesystemManager.observe().subscribe(filesystem => {
            this.filesystem = filesystem;
            if (!this.currentDirectory) {
                this.navigateRoot();
            }
        });
    }

    configureWindow(): WindowConfiguration {
        return {
            // minWidth: 500,
            minHeight: 300,
        };
    }

    getIcon(resource: Resource): string {
        if (FilesystemUtils.isDirectory(resource)) {
            return 'folder';
        }

        return 'description';
    }

    open(resource: Resource) {
        if (FilesystemUtils.isDirectory(resource)) {
            this.navigate(resource as Directory);
        }
    }

    navigate(directory: Directory) {
        if (directory === this.currentDirectory) {
            return;
        }

        this.history.push(this.currentDirectory);
        this.currentDirectory = directory;
    }

    navigateBack() {
        const lastDirectory = this.history.pop();
        if (lastDirectory) {
            this.currentDirectory = lastDirectory;
        }
    }

    navigateRoot() {
        this.history = [];
        this.currentDirectory = this.filesystem.rootDirectory;
    }

    currentDirectoryPath(): Directory[] {
        return FilesystemUtils.getPathAsArray(this.currentDirectory) as Directory[];
    }
}
