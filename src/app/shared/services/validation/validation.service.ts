import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('rePassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}
