import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemComponent } from './components/context/system/system.component';
import { DesktopComponent } from './components/system/desktop/desktop.component';
import { TaskbarComponent } from './components/system/desktop/taskbar/taskbar.component';
import { MaterialModule } from "./modules/material.module";
import { ClockComponent } from './components/system/desktop/taskbar/clock/clock.component';
import { ActivityComponent } from './components/system/desktop/taskbar/activity/activity.component';
import { LauncherComponent } from './components/system/desktop/taskbar/launcher/launcher.component';
import { ShortcutComponent } from './components/system/desktop/shortcut/shortcut.component';
import { WindowManagerComponent } from './components/system/desktop/window-manager/window-manager.component';
import { WindowComponent } from './components/system/window/window.component';

@NgModule({
    declarations: [
        AppComponent,
        SystemComponent,
        DesktopComponent,
        TaskbarComponent,
        ClockComponent,
        ActivityComponent,
        LauncherComponent,
        ShortcutComponent,
        WindowManagerComponent,
        WindowComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
