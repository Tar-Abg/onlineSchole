import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {SettingsService} from "../../../shared/services/settings/settings.service";
import {KeyValuePair} from "../../../shared/models/keyValuePair.model";
import {InfosService} from "../../../shared/services/infos/infos.service";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  cancelationHours$: Observable<KeyValuePair[]>;
  form: FormGroup;

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private infoService: InfosService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getRateAndPolitics();
    this.cancelationHours$ = this.infoService.getCancelationHours();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      userId: [this.storageService.getUserId()],
      hourlyRate: [null],
      cancellationId: [null],
    })
  }

  getRateAndPolitics(): void {
    this.subscription.add(
      this.settingsService.getRateAndPolitics(this.storageService.getUserId()).subscribe(data => {
        this.form.patchValue(data);
      })
    );
  }

  onSubmit(): void {
    const body = {
      ...this.form.value,
      hourlyRate: this.form.value.hourlyRate ? +this.form.value.hourlyRate : null
    }
    this.subscription.add(
      this.settingsService.updateRateAndPolitics(body).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
