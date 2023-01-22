import { Injectable } from '@angular/core';
import { CoreSystemService } from "./util/core-system.service";
import { BackendService } from "./backend.service";
import { Filesystem } from "../interfaces/core/filesystem";
import { Observable, ReplaySubject } from "rxjs";

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

    private update(filesystem: Filesystem) {
        this.filesystem = filesystem;
    }
}
