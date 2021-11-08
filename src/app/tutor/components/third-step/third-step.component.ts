import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
}
