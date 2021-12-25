import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {ValidationService} from "../../../shared/services/validation/validation.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  userImage: any;
  form: FormGroup;
  isSmallSizeForImage: boolean;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private registrationService: RegistrartionService,
    private settingsService: SettingsService,
    private cd: ChangeDetectorRef,
    private validationService: ValidationService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getWrapUpProfile();
  }

  getWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.getWrapUpProfile(this.storageService.getUserId()).subscribe(data => {
        if (data) {
          this.form.patchValue(data);
          this.userImage = data.photo;
        }
      })
    );
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

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      headline: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(75), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      photo: [null],
      bio: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(2000), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      wrapUp: [null],
    })
  }

  onSubmit(): void {
    this.subscription.add(
      this.settingsService.updateProfileInformation({...this.form.value, photo: this.userImage}).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
