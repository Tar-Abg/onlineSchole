import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  form: FormGroup;
  public dynamicFormList: FormGroup[] = [];
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrartionService
  ) { }

  ngOnInit(): void {
    this.formInitialization();
  }

  formInitialization(): void {
    this.form = this.createNewForm();
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      institutionName: [null, [Validators.required]],
      qualification: [null, [Validators.required]],
      date: [null, [Validators.required]],
    })
  }

  addNewForm(): void {
    const form = this.createNewForm();
    this.dynamicFormList.push(form);
  }

  onSubmit(): void {
    // let formList: any[] = [];
    // let isValidAllForms = true;
    //
    // if (this.form.valid) {
    //   this.dynamicFormList.forEach((form: FormGroup) => {
    //       if (form.valid) {
    //         formList.push(
    //           {
    //             ...form.value,
    //             date: form.value.date ? form.value.date.toISOString() : null,
    //             userId: 51
    //           }
    //         )
    //       } else {
    //         form.markAllAsTouched();
    //         isValidAllForms = false;
    //       }
    //     }
    //   )
    // } else {
    //   this.form.markAllAsTouched();
    //   isValidAllForms = false;
    // }
    //
    // if (isValidAllForms) {
    //   formList.push(
    //     {
    //       ...this.form.value,
    //       userId: 51
    //     });
    //   this.registrationService.saveCertificates(formList).subscribe(() => this.next.emit())
    // }
    this.next.emit()
  }

  removeForm(form: FormGroup) {
    this.dynamicFormList = this.dynamicFormList.filter(item => item !== form);
  }

}
