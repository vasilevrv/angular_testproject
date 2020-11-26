import { NgModule } from '@angular/core';
import {FormControlErrorPipe} from './pipes/form-control-error.pipe';

@NgModule({
  declarations: [
    FormControlErrorPipe
  ],
  exports: [
    FormControlErrorPipe
  ]
})
export class CommonModule { }
