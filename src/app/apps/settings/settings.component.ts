import { AfterViewInit, Component } from '@angular/core';
import { settingsStates } from "./settings.states";
import { ConfigureWindow, WindowConfiguration } from "../../system/interfaces/ui/window";
import { StateNavigationService } from "../../sdk/state-navigation/state-navigation.service";
import { State } from "../../sdk/state-navigation/state.interface";

@Component({
  selector: 'app-apps-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit, ConfigureWindow {
    states = settingsStates;
    homeState: State;
    currentState?: State;

    constructor(private stateNavigationService: StateNavigationService) {}

    configureWindow(): WindowConfiguration {
        return {
            minWidth: 400,
            minHeight: 300,
        };
    }

    ngAfterViewInit() {
        this.homeState = this.stateNavigationService.currentState('apps-settings');
        this.stateNavigationService.observeNavigation('apps-settings').subscribe(state => {
            this.currentState = state
        });
    }
}
