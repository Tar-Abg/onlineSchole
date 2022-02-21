import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Output() openSuccessModal: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  mailError: string;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
    })
    this.resetMailError();
  }

  onSubmit(): void {
    this.mailError = '';
    this.authService.restorePassword(this.form.value.email).subscribe(() => {
      this.openSuccessModal.emit();
    }, (error) => {
      this.mailError = error.error.title;
    })
  }

  resetMailError(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(() => this.mailError = '')
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
