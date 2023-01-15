import { Component } from '@angular/core';
import { State } from "../../sdk/state-navigation/state.interface";
import { HomeComponent } from "./views/home/home.component";
import { AboutComponent } from "./views/about/about.component";

@Component({
  selector: 'app-apps-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    states: Array<State> = [
        { name: 'home', component: HomeComponent, default: true },
        { name: 'about', component: AboutComponent }
    ];
}
