import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFilterPipe } from "./simple-filter.pipe";

const declarations = [
    SimpleFilterPipe
];

@NgModule({
    declarations: [
        ...declarations
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ...declarations
    ]
})
export class UtilsModule { }
