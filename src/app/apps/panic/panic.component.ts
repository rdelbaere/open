import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-apps-panic',
  template: '',
})
export class PanicComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate(['/panic']);
    }
}
