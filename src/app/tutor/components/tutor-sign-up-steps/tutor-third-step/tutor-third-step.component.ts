import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tutor-third-step',
  templateUrl: './tutor-third-step.component.html',
  styleUrls: ['./tutor-third-step.component.scss']
})
export class TutorThirdStepComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
