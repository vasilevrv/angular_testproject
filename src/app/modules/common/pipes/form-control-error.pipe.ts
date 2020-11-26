import {Pipe, PipeTransform} from "@angular/core";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {forEach} from 'lodash';

@Pipe({
  name: 'formControlError'
})
export class FormControlErrorPipe implements PipeTransform
{
  transform(errors: ValidationErrors): any {

    let error = '';
    if (errors) {
      forEach(errors, (_, index) => {
        error = 'VALIDATION.ERROR.' + index;
        return false;
      });
    }

    return error;
  }
}
