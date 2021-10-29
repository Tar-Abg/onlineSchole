import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-student-fifth-step',
  templateUrl: './student-fifth-step.component.html',
  styleUrls: ['./student-fifth-step.component.scss']
})
export class StudentFifthStepComponent implements OnInit {

  constructor() {
  }

  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
