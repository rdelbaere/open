import { Component } from '@angular/core';
import { SystemRuntime } from "../../services/system.runtime";
import { SystemConstants } from "../../interfaces/core/system";

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
        return `url('${SystemConstants.wallpaperPath}${this.wallpaper}')`;
    }
}
