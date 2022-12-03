import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KernelModule } from "./system/modules/kernel.module";
import { AppsModule } from "./system/modules/apps.module";

import { registerLocaleData } from "@angular/common";
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        KernelModule,
        AppsModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: "fr-FR" }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
