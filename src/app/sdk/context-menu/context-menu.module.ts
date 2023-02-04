import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../system/modules/material.module";

import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component';
import { ContextMenuContainerComponent } from "./context-menu-container/context-menu-container.component";

const declarations = [
    ContextMenuTriggerDirective,
    ContextMenuContainerComponent,
    ContextMenuItemComponent,
];

@NgModule({
    declarations: [
        ...declarations,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        ...declarations
    ]
})
export class ContextMenuModule { }
