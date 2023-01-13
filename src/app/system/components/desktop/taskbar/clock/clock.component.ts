import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-desktop-taskbar-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
    now: Date = new Date();
    timer: number;

    ngOnInit(): void {
        this.setupTimer();
    }

    ngOnDestroy(): void {
        this.stopTimer();
    }

    setupTimer() {
        this.timer = window.setInterval(() => {
            this.now = new Date();
        }, 1000);
    }

    stopTimer() {
        window.clearInterval(this.timer);
    }
}
