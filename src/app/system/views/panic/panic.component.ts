import { Component } from '@angular/core';

@Component({
    selector: 'app-views-panic',
    templateUrl: './panic.component.html',
    styleUrls: ['./panic.component.scss']
})
export class PanicComponent {
    solve() {
        window.location.href = '/';
    }
}
