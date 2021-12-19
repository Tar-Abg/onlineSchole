import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ValidationService} from "../../../../shared/services/validation/validation.service";

@Component({
  selector: 'app-tutor-second-step',
  templateUrl: './tutor-second-step.component.html',
  styleUrls: ['./tutor-second-step.component.scss']
})
export class TutorSecondStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  form: FormGroup;
  userImage: ArrayBuffer | null | string;
  private actionType: "CREATE" | "UPDATE" = "CREATE";
  isSmallSizeForImage: boolean;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
    private validationService: ValidationService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getWrapUpProfile();
    this.registrationService.stepNumber$.next(2);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      headline: [null, [Validators.required, Validators.minLength(15)]],
      photo: [null],
      bio: [null, [Validators.required, Validators.minLength(100)]],
      wrapUp: [null],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveWrapUpProfile();
      } else {
        this.updateWrapUpProfile();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.saveWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.nextStep())
    );
  }

  updateWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.updateWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.nextStep())
    )
  }

  selectFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0]) {
      reader.onload = (_event) => {
        this.checkImageSizes(reader.result as string);
      }
    }
  }

  checkImageSizes(image: string): void {
    this.validationService.checkImageSizes(image).then((image) => {
      if (image) {
        this.userImage = image;
        this.isSmallSizeForImage = false;
      } else {
        this.isSmallSizeForImage = true;
      }
      this.cd.detectChanges();
    })
  }

  getWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.getWrapUpProfile(this.storageService.getUserId()).subscribe(wrapUpProfile => {
        if (wrapUpProfile) {
          this.actionType = "UPDATE";
          this.form.patchValue(wrapUpProfile);
          this.userImage = wrapUpProfile.photo;
        } else {
          this.actionType = "CREATE";
        }
      })
    );
  }

  nextStep(): void {
    this.registrationService.stepNumber$.next(3);
    this.router.navigate(['tutor/profileDetails/step-three']);
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(1);
    this.router.navigate(['tutor/profileDetails/step-one']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
