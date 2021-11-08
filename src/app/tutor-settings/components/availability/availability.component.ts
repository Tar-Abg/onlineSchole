import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {SaveCertificates, TutorAvailabilities} from "../../../shared/models/registration.model";
import {Observable, Subscription} from "rxjs";
import {DaysOfWeek, HoursOfDay} from "../../../shared/models/infos.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  daysOfWeek$: Observable<DaysOfWeek[]>;
  hoursOfDay$: Observable<HoursOfDay[]>;
  form: FormGroup;
  private actionType: "CREATE" | "UPDATE" = "CREATE";

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.formInitialization();
    this.daysOfWeek$ = this.infoService.getDaysOfWeek();
    this.hoursOfDay$ = this.infoService.getHoursOfDay();
    this.getAvailabilities();
  }

  private formInitialization(): void {
    this.form = this.fb.group({
      formArray: this.fb.array([this.createNewForm()])
    });
  }

  createNewForm(): FormGroup {
    return this.fb.group({
      endHourId: [null],
      startHourId: [null],
      dayId: [null],
      userId:[this.storageService.getUserId()],
      id: [null]
    });
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  addNewForm(): void {
    const form = this.createNewForm();
    form.valueChanges.subscribe(() => this.formArray.updateValueAndValidity());
    this.formArray.controls.push(form);
    this.formArray.updateValueAndValidity();
  }

  removeForm(form: any): void {
    this.formArray.controls = this.formArray.controls.filter(item => item !== form);
    this.formArray.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.actionType === "CREATE") {
        this.saveAvailabilities();
      } else {
        this.updateAvailabilities();
      }
    }
  }

  saveAvailabilities(): void {
    this.subscription.add(
      this.settingService.saveAvailabilities(this.formArray.value).subscribe()
    );
  }

  updateAvailabilities(): void {
    this.subscription.add(
      this.settingService.updateAvailabilities(this.formArray.value).subscribe()
    );
  }

  patchFormValue(institutions: TutorAvailabilities[]): void {
    this.formArray.controls = [];
    institutions.forEach(item => {
      let form = this.createNewForm();
      form.patchValue(item)
      this.formArray.controls.push(form)
      this.formArray.updateValueAndValidity()
    });
  }

  getAvailabilities(): void {
    this.subscription.add(
      this.settingService.getAvailabilities(this.storageService.getUserId()).subscribe(data => {
        if (data.length > 0) {
          this.actionType = "UPDATE";
          this.patchFormValue(data);
        } else {
          this.actionType = "CREATE";
        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
