import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthService} from "../../services/auth/auth.service";
import {User, UserRole} from "../../models/auth.model";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
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
          this.router.navigate([`${UserRole[this.storageService.getItem('userRole')]}/profile`]);
        }
      })
    );
  }

}
