import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateNavigationViewComponent } from './state-navigation-view.component';
import { StateNavigationLinkDirective } from './state-navigation-link.directive';
import { StateNavigationService } from "./state-navigation.service";

const declarations = [
    StateNavigationViewComponent,
    StateNavigationLinkDirective,
];

@NgModule({
    declarations: [
        ...declarations,
    ],
    imports: [
        CommonModule,
    ],
    providers: [StateNavigationService],
    exports: [
        ...declarations
    ]
})
export class StateNavigationModule { }
