import { Component } from '@angular/core';
import { settingsStates } from "../../settings.states";

@Component({
    selector: 'app-apps-settings-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    states = settingsStates;
}
