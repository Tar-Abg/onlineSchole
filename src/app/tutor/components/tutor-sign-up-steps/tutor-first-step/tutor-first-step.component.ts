import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tutor-first-step',
  templateUrl: './tutor-first-step.component.html',
  styleUrls: ['./tutor-first-step.component.scss']
})
export class TutorFirstStepComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
