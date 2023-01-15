import { Component } from '@angular/core';
import { SystemRuntime } from "../../services/system.runtime";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
    private wallpaper: string;

    constructor(private systemRuntime: SystemRuntime) {
        this.systemRuntime.observeConfiguration().subscribe(config => {
            this.wallpaper = config.wallpaper;
        });
    }

    buildWallpaper(): string {
        return `url('/assets/images/system/wallpaper/${this.wallpaper}')`;
    }
}
