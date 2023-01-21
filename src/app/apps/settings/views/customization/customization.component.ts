import { Component } from '@angular/core';
import { themesValues, wallpapersValues } from "./values";
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

    themes = themesValues;
    themeClassPrefix = SystemConstants.themeClassPrefix;

    constructor(private systemRuntime: SystemRuntime) {
        this.systemRuntime.observeConfiguration().subscribe(config => {
            this.configuration = config;
        });
    }

    changeValue(key: string, value: string) {
        if(value === this.configuration[key]){
            return;
        }

        this.systemRuntime.updateConfiguration(key, value);
    }
}
