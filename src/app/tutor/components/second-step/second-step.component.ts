import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../../../shared/services/registration/registration.service";

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit{

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private registrationService: RegistrationService,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.stepNumber$.next(2);
  }

  nextStep(): void {
    this.registrationService.stepNumber$.next(3);
    this.router.navigate(['tutor/signUp/step-three']);
  }
}
