import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tutor-third-step',
  templateUrl: './tutor-third-step.component.html',
  styleUrls: ['./tutor-third-step.component.scss']
})
export class TutorThirdStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    setTimeout(() => {
      this.registrationService.stepNumber$.next(3); //will be improved
    })
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

  previousStep(): void {
    this.registrationService.stepNumber$.next(2);
    this.router.navigate(['tutor/profileDetails/step-two']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
