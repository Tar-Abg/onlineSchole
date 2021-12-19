import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cancel-lesson-modal',
  templateUrl: './cancel-lesson-modal.component.html',
  styleUrls: ['./cancel-lesson-modal.component.scss']
})
export class CancelLessonModalComponent implements OnInit {
  @Output() onCloe: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
