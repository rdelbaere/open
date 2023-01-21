import { Injectable } from '@angular/core';
import { CoreSystemService } from "./util/core-system.service";
import { BackendService } from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class FilesystemManager extends CoreSystemService {
    constructor(private backendService: BackendService) {
        super();
    }

    initialize(filesystemId: string) {
        this.backendService.get(`/filesystems/${filesystemId}`).subscribe({
            next: () => {
                this.ready();
            }
        });
    }
}
