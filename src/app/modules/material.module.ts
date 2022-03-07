import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";


const modules = [
    MatIconModule,
    DragDropModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
