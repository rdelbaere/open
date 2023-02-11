import { Injectable, Type } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) {}

    open<T>(component: Type<T>) {
        this.dialog.open(component);
    }
}
