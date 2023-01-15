import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SettingsComponent } from "./settings.component";
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { StateNavigationModule } from "../../sdk/state-navigation/state-navigation.module";

@NgModule({
    declarations: [
        SettingsComponent,
        HomeComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        StateNavigationModule,
    ],
})
export class SettingsModule { }
