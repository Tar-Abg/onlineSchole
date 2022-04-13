import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../services/storage/storage.service';
import {InfosService} from '../../services/infos/infos.service';
import {DateService} from '../../services/date/date.service';
import {Observable} from 'rxjs';
import {Month} from '../../models/infos.model';
import {KeyValuePair} from '../../models/keyValuePair.model';
import {SettingsService} from '../../services/settings/settings.service';
import {PaymentMethod} from '../../models/settings.model';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  form: FormGroup;
  months$: Observable<Month[]>;
  yearList: KeyValuePair[];
  paymentMethod$: Observable<PaymentMethod>;
  showUpdateCard: boolean;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private infoService: InfosService,
    private dateService: DateService,
    private settingService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.months$ = this.infoService.getMonths();
    this.yearList = this.dateService.getYearsForCard();
    this.getPaymentMethod();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      userId: [this.storageService.getUserId()],
      cardNumber: [null, [Validators.required]],
      expMonth: [null, [Validators.required]],
      expYear: [null, [Validators.required]],
      name: [null, [Validators.required]],
      cvc: [null, [Validators.required]],
    });
    this.form.disable();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.showUpdateCard = true;
    } else {
      this.form.markAllAsTouched()
    }
  }

  getPaymentMethod(): void {
    this.paymentMethod$ = this.settingService.getPaymentMethod(this.storageService.getUserId());
  }
}
