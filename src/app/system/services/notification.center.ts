import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Notification } from "../interfaces/core/notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationCenter {
    private notifications: Array<Notification> = [];
    private liveFeed: ReplaySubject<Notification> = new ReplaySubject<Notification>(1);

    constructor(){}

    dispatch(notification: Notification): void{
        this.notifications.push(notification);
        this.liveFeed.next(notification);
    }

    live(): Observable<Notification>{
        return this.liveFeed.asObservable();
    }
}
