import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit{

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private registrationService: RegistrartionService,
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
