import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SettingsComponent } from "./settings.component";
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';

@NgModule({
    declarations: [
        SettingsComponent,
        HomeComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class SettingsModule { }
