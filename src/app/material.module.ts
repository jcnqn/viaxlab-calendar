import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    DragDropModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MaterialModule {
}
