import {Component, OnInit} from '@angular/core';
import {RegistrartionService} from "../../../../shared/services/registration/registrartion.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.scss']
})
export class TutorSignUpComponent implements OnInit {
  stepNumber$: BehaviorSubject<number>;

  constructor(
    private registrationService: RegistrartionService
  ) {
  }

  ngOnInit(): void {
    this.stepNumber$ = this.registrationService.stepNumber$;
  }

}
