import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage/storage.service";
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tutor-second-step',
  templateUrl: './tutor-second-step.component.html',
  styleUrls: ['./tutor-second-step.component.scss']
})
export class TutorSecondStepComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  userImage: ArrayBuffer | null | string;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getWrapUpProfile();
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
      this.registrationService.saveWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.next.emit())
    );
  }

  updateWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.updateWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.next.emit())
    )
  }

  selectFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.userImage = reader.result;
      this.form.get('photo')?.setValue(true);
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
