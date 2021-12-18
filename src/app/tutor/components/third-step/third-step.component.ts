import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrartionService} from "../../../shared/services/registration/registrartion.service";

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit{

  constructor(
    private router: Router,
    private registrationService: RegistrartionService,
  ) {
  }

  ngOnInit(): void {
    this.registrationService.stepNumber$.next(3);
  }

  nextStep(): void {
    this.registrationService.stepNumber$.next(4);
    this.router.navigate(['tutor/signUp/step-four']);
  }

  previousStep(): void {
    this.registrationService.stepNumber$.next(2);
    this.router.navigate(['tutor/signUp/step-two']);
  }
}
