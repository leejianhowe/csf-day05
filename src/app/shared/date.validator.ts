import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidatorFn,
  Validator,
  FormControl,
} from '@angular/forms';

// validation function
function checkDate(): ValidatorFn {
  return (c: AbstractControl) => {
    // get legal date 21 years ago from today
    let legalDate = new Date();
    legalDate.setHours(0, 0, 0, 0);
    console.log('todays date', legalDate); // Sun Nov 22 2020 00:00:00 GMT+0800 (Singapore Standard Time)
    let oldYear = legalDate.getFullYear() - 21;
    legalDate.setFullYear(oldYear);
    console.log('legal date', legalDate); // Mon Nov 22 1999 00:00:00 GMT+0800 (Singapore Standard Time) 
    let legalDateVal = legalDate.getTime();
    console.log('legal date value', legalDateVal); // 943200000000

    console.log('control value', c.value); // 1999-11-22
    let selectedDate = new Date(c.value);
    selectedDate.setHours(0, 0, 0, 0);
    console.log('selected date value', selectedDate); // Mon Nov 22 1999 00:00:00 GMT+0800 (Singapore Standard Time)
    let selectedDateVal = selectedDate.getTime();
    console.log('selected date', selectedDateVal); // 943200000000
    
    // selected date should be lesser than or equal to legal date
    let isValid = selectedDateVal <= legalDateVal;
    if (isValid) {
      // true
      console.log('21 year and older');
      return null;
    } else {
      // false
      console.log('not allowed');
      return {
        checkDate: {
          valid: false,
        },
      };
    }
  };
}
@Directive({
  selector: '[checkDate][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckDate, multi: true }],
})
export class CheckDate implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = checkDate();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
