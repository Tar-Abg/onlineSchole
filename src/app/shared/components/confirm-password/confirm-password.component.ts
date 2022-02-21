import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input() body: any;
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
      this.updatePersonalInformation();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
