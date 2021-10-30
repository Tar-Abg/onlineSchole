import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.scss']
})
export class StudentSignUpComponent implements OnInit {
  stepNumber: number = 4;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeStepNumber(direction: 'BACK' | "FORWARD"): void {
    direction === "FORWARD" ? this.stepNumber++ : this.stepNumber--;
  }
}
