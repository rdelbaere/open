import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSearchPipe } from "../pipes/simple-search.pipe";

const declarations = [
    SimpleSearchPipe
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
export class SharedModule { }
