import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Notification } from "../interfaces/core/notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationCenter {
    private liveFeed: ReplaySubject<Notification> = new ReplaySubject<Notification>(1);

    dispatch(notification: Notification): void{
        this.liveFeed.next(notification);
    }

    live(): Observable<Notification>{
        return this.liveFeed.asObservable();
    }
}
