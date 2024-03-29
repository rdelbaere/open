import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { State } from "./state.interface";
import { StateNavigationService } from "./state-navigation.service";

@Component({
    selector: 'sdk-state-navigation-view',
    template: '',
})
export class StateNavigationViewComponent implements OnInit, OnDestroy {
    @Input() name: string;
    @Input() states: Array<State>;

    constructor(private viewContainerRef: ViewContainerRef, private navigationService: StateNavigationService) {}

    ngOnInit() {
        const subject = this.navigationService.register(this.name, this.getDefaultState());
        subject.subscribe(state => this.navigate(state));
    }

    ngOnDestroy() {
        this.navigationService.unregister(this.name);
    }

    private navigate(state: State) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createComponent(state.component);
    }

    private getDefaultState(): State {
        for (const state of this.states) {
            if (state.default) {
                return state;
            }
        }

        return this.states[0];
    }
}
