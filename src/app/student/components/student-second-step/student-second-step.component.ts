import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-student-second-step',
  templateUrl: './student-second-step.component.html',
  styleUrls: ['./student-second-step.component.scss']
})
export class StudentSecondStepComponent implements OnInit {

  constructor() {
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
