import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  userImage: any;
  form: FormGroup;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private registrationService: RegistrartionService,
    private settingsService: SettingsService,
    private cd: ChangeDetectorRef
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
          this.form.patchValue(data)
          this.userImage = data.photo;
        }
      })
    );
  }

  selectFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.userImage = reader.result;
      this.cd.detectChanges();
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      photo: [null],
      wrapUp: [null],
    });
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
