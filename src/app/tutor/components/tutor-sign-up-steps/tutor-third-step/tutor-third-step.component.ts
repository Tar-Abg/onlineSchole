import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tutor-third-step',
  templateUrl: './tutor-third-step.component.html',
  styleUrls: ['./tutor-third-step.component.scss']
})
export class TutorThirdStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private registrationService: RegistrartionService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      legalFirstName: [null, Validators.required],
      legalLastName: [null, Validators.required],
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.subscription.add(
        this.registrationService.saveTermsForTutor(this.form.value).subscribe()
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
