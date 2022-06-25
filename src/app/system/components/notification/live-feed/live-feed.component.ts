import { Component, OnInit } from "@angular/core";
import { NotificationCenter } from "../../../services/notification.center";
import { Notification } from "../../../interfaces/core/notification";

@Component({
    selector: 'app-notification-live-feed',
    templateUrl: './live-feed.component.html',
    styleUrls: ['./live-feed.component.scss']
})
export class LiveFeedComponent implements OnInit {
    feed: Array<Notification> = [];

    constructor(private notificationCenter: NotificationCenter){}

    ngOnInit(): void{
        this.notificationCenter.live().subscribe(n => this.present(n));
    }

    present(notification: Notification){
        this.feed.push(notification);

        setTimeout(() => this.clear(notification), 6000)
    }

    clear(notification: Notification){
        const index = this.feed.indexOf(notification);
        if(index >= 0){
            this.feed.splice(index, 1);
        }
    }
}
