import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-student-fourth-step',
  templateUrl: './student-fourth-step.component.html',
  styleUrls: ['./student-fourth-step.component.scss']
})
export class StudentFourthStepComponent implements OnInit {

  constructor() {
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
