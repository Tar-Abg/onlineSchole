import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-student-third-step',
  templateUrl: './student-third-step.component.html',
  styleUrls: ['./student-third-step.component.scss']
})
export class StudentThirdStepComponent implements OnInit {

  constructor() {
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
