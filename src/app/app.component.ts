import { Component } from '@angular/core';
import { SystemRuntime } from "./system/services/system.runtime";
import { SystemConstants } from "./system/interfaces/core/system";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    themeClassPrefix = SystemConstants.themeClassPrefix;
    theme: string;

    constructor(private systemRuntime: SystemRuntime) {
        this.loadTheme();
    }

    loadTheme(){
        this.systemRuntime.observeConfiguration().subscribe(configuration => {
            this.theme = configuration.theme;
        });
    }
}
