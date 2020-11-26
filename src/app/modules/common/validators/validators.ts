import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {DurationInputArg1, DurationInputArg2, Moment} from 'moment';

export class Validators {

  static greaterThan(amount: DurationInputArg1, unit: DurationInputArg2): ValidatorFn {

    return (control: AbstractControl): ValidationErrors|null => {
      const test: Moment = control.value;
      if (!test) {
        return null;
      }

      const now = moment();
      const comp = now.clone().add(amount, unit);
      if (test.isBefore(comp)) {
        return {greaterThan: true};
      }

      return null;
    };
  }

  static lessThan(amount: DurationInputArg1, unit: DurationInputArg2): ValidatorFn {

    return (control: AbstractControl): ValidationErrors|null => {
      const test: Moment = control.value;
      if (!test) {
        return null;
      }

      const now = moment();
      const comp = now.clone().add(amount, unit);
      if (test.isAfter(comp)) {
        return {lessThan: true};
      }

      return null;
    };
  }
}
