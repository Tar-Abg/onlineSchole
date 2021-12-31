import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../models/auth.model";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  errorMessage: string;
  passwordType: 'password' | 'text' = 'password';

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  login(): void {
    this.subscription.add(
      this.authService.login(this.form.value).subscribe((user: User) => {
        if (!user.token) {
          this.errorMessage = user.message;
        } else {
          const loggedUser= this.authService.extractUserFromToken(user.token);
          this.authService.setUserId(+loggedUser.UserId);
          this.router.navigate([`${user.roles[0].toLowerCase()}/profile`]);
        }
      })
    );
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
