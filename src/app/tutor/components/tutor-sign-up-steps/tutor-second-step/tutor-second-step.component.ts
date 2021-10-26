import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tutor-second-step',
  templateUrl: './tutor-second-step.component.html',
  styleUrls: ['./tutor-second-step.component.scss']
})
export class TutorSecondStepComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
