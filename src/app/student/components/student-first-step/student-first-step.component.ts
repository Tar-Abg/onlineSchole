import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-student-first-step',
  templateUrl: './student-first-step.component.html',
  styleUrls: ['./student-first-step.component.scss']
})
export class StudentFirstStepComponent implements OnInit {

  constructor() {
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
