import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.scss']
})
export class TutorSignUpComponent implements OnInit {
  stepNumber: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeStepNumber(direction: 'BACK' | "FORWARD"): void {
    direction === "FORWARD" ? this.stepNumber++ : this.stepNumber--;
  }
}
