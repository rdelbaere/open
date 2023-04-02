import { Component, Renderer2 } from '@angular/core';
import { SystemRuntime } from "./system/services/system.runtime";
import { SystemConstants } from "./system/interfaces/core/system";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    theme: string;

    constructor(
        private renderer: Renderer2,
        private systemRuntime: SystemRuntime
    ) {
        this.loadTheme();
    }

    loadTheme(){
        this.systemRuntime.observeConfiguration().subscribe(configuration => {
            this.theme = configuration.theme;
            this.renderer.addClass(document.body, SystemConstants.themeClassPrefix + this.theme);
        });
    }
}
