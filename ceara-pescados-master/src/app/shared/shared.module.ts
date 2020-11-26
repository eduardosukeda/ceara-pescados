import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPesoPipe } from './pipes/maskPeso.pipe';



@NgModule({
  declarations: [
    MaskPesoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaskPesoPipe
  ]
})
export class SharedModule { }
