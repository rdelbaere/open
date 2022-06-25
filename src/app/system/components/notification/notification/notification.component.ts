import { Component, Input, OnInit } from '@angular/core';
import { Notification } from "../../../interfaces/core/notification";

@Component({
    selector: 'app-notification-entry',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    @Input() notification: Notification;

    constructor() { }

    ngOnInit(): void {
    }
}
