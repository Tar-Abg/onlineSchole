import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subject, Subscription} from "rxjs";
import {MessageService} from "../../services/message/message.service";
import {RegistrationService} from "../../services/registration/registration.service";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Input() userId: number;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  rePasswordVisible: boolean;
  passwordVisible: boolean;
  passwordValidation$: Subject<string>;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private messageService: MessageService,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.passwordValidation$ = this.registrationService.passwordValidation$;
    this.resetPasswordError();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    }, {validators: this.validationService.checkPasswords})
  }

  onSubmit(): void {
    this.subscription.add(
      this.authService.changePassword(this.userId, this.form.value.password).subscribe((data) => {
        this.messageService.setNewMessage(data);
        this.close.emit();
      }, error => {
        this.messageService.setNewMessage(error.error.title);
        this.close.emit();
      })
    );
  }

  changePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  changeRePasswordVisibility(): void {
    this.rePasswordVisible = !this.rePasswordVisible;
  }

  resetPasswordError(): void {
    this.subscription.add(
      this.form.get('password')?.valueChanges.subscribe(
        () => this.registrationService.passwordValidation$.next('')
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
