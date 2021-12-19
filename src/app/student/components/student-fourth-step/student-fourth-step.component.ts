import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Subscription} from "rxjs";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {Router} from "@angular/router";
import {ValidationService} from "../../../shared/services/validation/validation.service";

@Component({
  selector: 'app-student-fourth-step',
  templateUrl: './student-fourth-step.component.html',
  styleUrls: ['./student-fourth-step.component.scss']
})
export class StudentFourthStepComponent implements OnInit, OnDestroy {
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
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.stepNumber$.next(4);
    this.initializeForm();
    this.getWrapUpProfile();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      photo: [null],
      wrapUp: [null, [Validators.required, Validators.minLength(50), Validators.maxLength(200), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      headline: [null],
      bio: [null]
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

  getWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.getWrapUpProfile(this.storageService.getUserId()).subscribe(profileInfo => {
        if (profileInfo) {
          this.actionType = "UPDATE";
          this.form.patchValue(profileInfo);
          this.userImage = profileInfo.photo;
        } else {
          this.actionType = "CREATE";
        }
      })
    );
  }

  selectFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0]) {
      reader.onload = (_event) => {
        this.checkImageSizes(reader.result as string)
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

  nextStep(): void {
    this.registrationService.stepNumber$.next(5);
    this.router.navigate(['student/signUp/step-five']);
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(2);
    this.router.navigate(['student/signUp/step-three']);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
