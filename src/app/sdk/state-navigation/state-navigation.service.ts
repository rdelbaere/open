import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { State } from "./state.interface";

@Injectable()
export class StateNavigationService {
    private navigations: {[key: string]: BehaviorSubject<State>} = {};

    register(navigationName: string, defaultState: State): Observable<State> {
        if(this.navigations[navigationName] !== undefined) {
            throw new Error(`Another navigation already has the name '${navigationName}'`);
        }

        this.navigations[navigationName] = new BehaviorSubject<State>(defaultState);
        return this.navigations[navigationName].asObservable();
    }

    unregister(navigationName: string) {
        delete this.navigations[navigationName];
    }

    navigate(navigationName: string, state: State) {
        this.checkNavigationName(navigationName);
        this.navigations[navigationName].next(state);
    }

    currentState(navigationName: string): State {
        this.checkNavigationName(navigationName);
        return this.navigations[navigationName].getValue();
    }

    observeNavigation(navigationName: string): Observable<State> {
        this.checkNavigationName(navigationName);
        return this.navigations[navigationName].asObservable();
    }

    private checkNavigationName(navigationName: string) {
        if(this.navigations[navigationName] === undefined) {
            throw new Error(`Navigation with the name '${navigationName}' does not exist`);
        }
    }
}
