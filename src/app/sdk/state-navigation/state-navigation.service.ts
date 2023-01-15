import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class StateNavigationService {
    private navigations: {[key: string]: Subject<string>} = {};

    register(navigationName: string): Subject<string> {
        if(this.navigations[navigationName] !== undefined) {
            throw new Error(`Another navigation already has the name '${navigationName}'`);
        }

        this.navigations[navigationName] = new Subject<string>();
        return this.navigations[navigationName];
    }

    unregister(navigationName: string) {
        delete this.navigations[navigationName];
    }

    navigate(navigationName: string, stateName: string) {
        if(this.navigations[navigationName] === undefined) {
            throw new Error(`Navigation with the name '${navigationName}' does not exist`);
        }

        this.navigations[navigationName].next(stateName);
    }
}
