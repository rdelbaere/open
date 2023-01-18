import { Directive, HostListener, Input } from '@angular/core';
import { StateNavigationService } from "./state-navigation.service";
import { State } from "./state.interface";

@Directive({
  selector: '[sdkStateNavigationLink]'
})
export class StateNavigationLinkDirective {
    @Input() sdkStateNavigationLink: State;
    @Input() navigationName: string;

    constructor(private navigationService: StateNavigationService) {}

    @HostListener('click')
    onClick(){
        this.navigationService.navigate(this.navigationName, this.sdkStateNavigationLink);
    }
}
