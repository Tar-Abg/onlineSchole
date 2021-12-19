import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-end-lesson-modal',
  templateUrl: './end-lesson-modal.component.html',
  styleUrls: ['./end-lesson-modal.component.scss']
})
export class EndLessonModalComponent implements OnInit {
  @Output() onCloe: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
