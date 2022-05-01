import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthInfo, UserRole} from "../../shared/models/auth.model";
import {StorageService} from "../../shared/services/storage/storage.service";
import {StudentProfileService} from "../../student-profile/services/student-profile.service";
import {Student} from "../../student-profile/models/student-profile.model";
import {TutorService} from "../../tutor-profile/services/tutor-service.service";
import {tap} from "rxjs/operators";
import {TutorBaseInfo} from "../../tutor-profile/models/tutor.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Output() openLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output() openRegister: EventEmitter<void> = new EventEmitter<void>();
  isLoggedIn$: Observable<boolean>;
  loggedUser$: BehaviorSubject<UserAuthInfo | null> = new BehaviorSubject<UserAuthInfo | null>(null);
  isOpenNestedDropdown: boolean;
  user: Student | TutorBaseInfo;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private studentService: StudentProfileService,
    private tutorService: TutorService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$.pipe(
      tap(data => data && this.getLoggedUser())
    );
    this.loggedUser$ = this.authService.loggedUser$;
    this.extractUserFromToken();
  }

  signOut(): void {
    this.authService.signOut().subscribe();
  }

  extractUserFromToken(): void {
    const token = this.storageService.getItem('auth_token');
    token && this.authService.extractUserFromToken(token);
  }

  getLoggedUser(): void {
    if (this.authService.isLoggedIn$) {
      const userRole = this.storageService.getItem('userRole');
      const userId = this.storageService.getItem('userId');
      if (userRole == UserRole.student) {
       this.getStudent(userId);
      } else {
       this.getTutor(userId);
      }
    }
  }

  getStudent(id: number): void {
    this.subscription.add(
      this.studentService.getProfileInfo(id).subscribe(student => this.user = student)
    );
  }

  getTutor(id: number): void {
    this.subscription.add(
      this.tutorService.getTutorBaseInfo(id).subscribe(student => this.user = student)
    );
  }

  navigateToSettings(): void {
    this.router.navigate([`${UserRole[this.userType]}/settings`]);
  }

  navigateToProfile(): void {
    this.router.navigate([`${UserRole[this.userType]}/profile`]);
  }

  get userType(): number {
    return this.storageService.getItem('userRole');
  }

  navigate(routName: string): void {
    this.router.navigate([`/${routName}`], {relativeTo: this.route} )
  }

  openLoginPage(): void {
    if (this.router.routerState.snapshot.url !== '/') {
      this.router.navigate(['/']);
      setTimeout(() => {
        this.openLogin.next();
      }, 1000)
    } else {
      this.openLogin.next();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
