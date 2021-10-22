import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  stepNumber: number = 2;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeStepNumber(direction: 'BACK' | "FORWARD"): void {
    direction === "FORWARD" ? this.stepNumber++ : this.stepNumber--;
  }
}
