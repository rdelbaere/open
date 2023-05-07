import { Injectable } from '@angular/core';
import { CoreSystemService } from "./util/core-system.service";
import { BackendService } from "./backend.service";
import { DirectoryNode, FileNode, Filesystem } from "../interfaces/core/filesystem";
import { Observable, ReplaySubject } from "rxjs";
import { FilesystemUtils } from "../../sdk/utils/filesystem.utils";
import { map, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilesystemManager extends CoreSystemService {
    private filesystem: Filesystem;
    private filesystemSubject = new ReplaySubject<Filesystem>(1);

    constructor(private backendService: BackendService) {
        super();
    }

    initialize(filesystemId: string) {
        this.backendService.get(`/filesystems/${filesystemId}`).subscribe({
            next: payload => {
                this.update(payload.data);
                this.ready();
            }
        });
    }

    observe(): Observable<Filesystem> {
        return this.filesystemSubject.asObservable();
    }

    createDirectory(directory: Partial<DirectoryNode>) {
        const uri = `/filesystems/${this.filesystem.id}/resource`;
        return this.backendService.post(uri, {
            isDirectory: true,
            ...directory
        }).pipe(
            map(response => this.update(response.data))
        );
    }

    importFile(fileNode: Pick<FileNode, "path"|"name"|"file">) {
        return this.backendService.preloadFile(fileNode.file).pipe(
            mergeMap(response => {
                const uri = `/filesystems/${this.filesystem.id}/resource`;
                return this.backendService.post(uri, {
                    isDirectory: false,
                    tempfile: response.data,
                    ...fileNode
                });
            }),
            map(response => this.update(response.data))
        );
    }

    private update(filesystem: Filesystem) {
        this.prepare(filesystem);
        this.filesystem = filesystem;
        this.filesystemSubject.next(this.filesystem);
    }

    private prepare(filsystem: Filesystem) {
        FilesystemUtils.restoreTree(filsystem.rootDirectory);
    }
}
