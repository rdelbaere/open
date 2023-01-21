import { Observable, ReplaySubject } from "rxjs";

export abstract class CoreSystemService {
    private readySubject = new ReplaySubject<void>(1);

    observeReady(): Observable<void> {
        return this.readySubject.asObservable();
    }

    ready() {
        this.readySubject.next();
    }
}
