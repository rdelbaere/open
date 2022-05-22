import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from "../views/login/login.component";
import { SystemComponent } from "../views/system/system.component";

import { DesktopComponent } from "../components/desktop/desktop.component";
import { WindowContainerComponent } from "../components/desktop/window-container/window-container.component";
import { TaskbarComponent } from "../components/desktop/taskbar/taskbar.component";
import { ClockComponent } from "../components/desktop/taskbar/clock/clock.component";
import { ActivityComponent } from "../components/desktop/taskbar/activity/activity.component";
import { LauncherComponent } from "../components/desktop/taskbar/launcher/launcher.component";
import { ShortcutComponent } from "../components/desktop/shortcut/shortcut.component";

import { WindowComponent } from "../components/window/window.component";
import { WindowHandleComponent } from "../components/window/window-handle/window-handle.component";
import { WindowRuntimeComponent } from '../components/window/window-runtime/window-runtime.component';

import { MaterialModule } from "./material.module";

@NgModule({
    declarations: [
        LoginComponent,
        SystemComponent,
        DesktopComponent,
        WindowContainerComponent,
        TaskbarComponent,
        ClockComponent,
        ActivityComponent,
        LauncherComponent,
        ShortcutComponent,
        WindowComponent,
        WindowHandleComponent,
        WindowRuntimeComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class KernelModule { }
