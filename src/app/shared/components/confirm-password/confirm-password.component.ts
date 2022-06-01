import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../services/settings/settings.service";
import {Subscription} from "rxjs";
import {MessageService} from "../../services/message/message.service";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() updated: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm: EventEmitter<string> = new EventEmitter<string>();
  @Input() body: any;
  @Input() actionType: 'updatePersonalInformation' | 'updateCard' | 'updateTutorPayment' = 'updatePersonalInformation';
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private settingService: SettingsService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required]]
    });
    this.initializeSubscriptions();
  }

  initializeSubscriptions(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(() => this.errorMessage = '')
    );
  }

  onConfirm(): void {
    this.errorMessage = '';
    if (this.form.valid) {
      if (this.actionType === 'updatePersonalInformation') {
        this.updatePersonalInformation();
      } else if (this.actionType === 'updateTutorPayment') {
        this.confirm.emit(this.form.value.password);
      } else {
        this.updateCart();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  updatePersonalInformation(): void {
    this.subscription.add(
      this.settingService.updatePersonalInformation(this.body, this.form.value.password).subscribe(
        (data) => {
          this.updated.emit();
          data.emailChangeRequest && this.messageService.setNewMessage(data.emailChangeRequest);
          this.close.emit();
        },
        (error => {
          this.errorMessage = error.error.title;
        })
      )
    );
  }

  updateCart(): void {
    const body = {
      ...this.body,
      cardNumber: this.body.cardNumber.toString()
    }
    this.settingService.updatePaymentMethod(body, this.form.value.password).subscribe(() => {
      this.updated.emit();
      this.close.emit();
    }, (error => {
      this.errorMessage = error.error.title;
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
