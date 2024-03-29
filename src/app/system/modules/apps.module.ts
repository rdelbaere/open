import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppCenterModule } from "../../apps/app-center/app-center.module";
import { CalculatorModule } from "../../apps/calculator/calculator.module";
import { FileExplorerModule } from "../../apps/file-explorer/file-explorer.module";
import { SettingsModule } from "../../apps/settings/settings.module";
import { PanicModule } from "../../apps/panic/panic.module";

@NgModule({
    imports: [
        CommonModule,
        AppCenterModule,
        CalculatorModule,
        FileExplorerModule,
        SettingsModule,
        PanicModule
    ],
})
export class AppsModule { }
