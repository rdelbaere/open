import { Component } from '@angular/core';
import { SystemConstants } from "../../../../system/interfaces/core/system";

@Component({
    selector: 'app-apps-settings-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    systemVersion = SystemConstants.version;
}
