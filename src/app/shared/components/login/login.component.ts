import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthService} from "../../services/auth/auth.service";
import {RegistrationSteps, TutorFinaleSteps, User, UserRole} from "../../models/auth.model";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {Subscription} from "rxjs";
import {MessageService} from "../../services/message/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Output() forgotPassword: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  errorMessage: string;
  passwordType: 'password' | 'text' = 'password';

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private authService: AuthService,
    private messageService: MessageService,
    private storageService: StorageService,
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
          this.checkUserStatus(user);
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

  checkUserStatus(user: User): void {
    if (user.activationStatus > 1 && user.activationStatus <= 5) {
      this.setUserInfoInStorage(user);
      this.router.navigate([`${UserRole[user.userType]}/signUp/${RegistrationSteps[user.activationStatus]}`]);
    } else if(user.activationStatus >= 8 && user.activationStatus <= 10) {
      this.setUserInfoInStorage(user);
      this.router.navigate([`tutor/profileDetails/${TutorFinaleSteps[user.activationStatus]}`]);
    } else {
      user.warningMessage && (this.errorMessage = user.warningMessage);
      this.form.reset();
    }
  }

  setUserInfoInStorage(user: User): void {
    this.storageService.setItem('userType', user.userType);
    this.storageService.setItem('userId', user.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
