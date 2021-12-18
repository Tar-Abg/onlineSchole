import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Subscription} from "rxjs";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-student-fourth-step',
  templateUrl: './student-fourth-step.component.html',
  styleUrls: ['./student-fourth-step.component.scss']
})
export class StudentFourthStepComponent implements OnInit, OnDestroy {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  private subscription: Subscription = new Subscription();
  form: FormGroup;
  userImage: ArrayBuffer | null | string;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private registrationService: RegistrartionService,
    private cd: ChangeDetectorRef
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
      this.registrationService.saveWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.next.emit())
    );
  }

  updateWrapUpProfile(): void {
    this.subscription.add(
      this.registrationService.updateWrapUpProfile({...this.form.value, photo: this.userImage}).subscribe(() => this.next.emit())
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
    reader.onload = (_event) => {
      this.userImage = reader.result;
      this.cd.detectChanges()
      this.form.get('photo')?.setValue(true);
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
