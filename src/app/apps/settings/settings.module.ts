import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SettingsComponent } from "./settings.component";
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { StateNavigationModule } from "../../sdk/state-navigation/state-navigation.module";
import { MaterialModule } from "../../system/modules/material.module";
import { CustomizationComponent } from './views/customization/customization.component';
import { AccountComponent } from './views/account/account.component';
import { UtilsModule } from "../../sdk/utils/utils.module";

@NgModule({
    declarations: [
        SettingsComponent,
        HomeComponent,
        AboutComponent,
        CustomizationComponent,
        AccountComponent,
    ],
    imports: [
        CommonModule,
        StateNavigationModule,
        MaterialModule,
        UtilsModule,
    ],
})
export class SettingsModule { }
