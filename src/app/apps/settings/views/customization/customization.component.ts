import { Component } from '@angular/core';
import { wallpapersValues } from "./values";
import { SystemConfiguration, SystemConstants } from "../../../../system/interfaces/core/system";
import { SystemRuntime } from "../../../../system/services/system.runtime";

@Component({
    selector: 'app-apps-settings-customization',
    templateUrl: './customization.component.html',
    styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent {
    configuration: SystemConfiguration;
    wallpapers = wallpapersValues;
    wallpaperPath = SystemConstants.wallpaperPath;

    constructor(private systemRuntime: SystemRuntime) {
        this.systemRuntime.observeConfiguration().subscribe(config => {
            console.log('config');
            this.configuration = config;
        });
    }

    changeValue(key: string, value: string) {
        this.systemRuntime.updateConfiguration(key, value);
    }
}
