import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../../../shared/services/registration/registration.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.scss']
})
export class TutorSignUpComponent implements OnInit {
  stepNumber$: BehaviorSubject<number>;

  constructor(
    private registrationService: RegistrationService
  ) {
  }

  ngOnInit(): void {
    this.stepNumber$ = this.registrationService.stepNumber$;
  }

}
