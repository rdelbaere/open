import { Component, Input } from '@angular/core';
import { Notification } from "../../../interfaces/core/notification";

@Component({
    selector: 'app-notification-entry',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() notification: Notification;
}
