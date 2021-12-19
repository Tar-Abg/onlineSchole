import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-lesson',
  templateUrl: './start-lesson.component.html',
  styleUrls: ['./start-lesson.component.scss']
})
export class StartLessonComponent implements OnInit {
  isOpenEndLesson: boolean;
  isOpenCancelLesson: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
