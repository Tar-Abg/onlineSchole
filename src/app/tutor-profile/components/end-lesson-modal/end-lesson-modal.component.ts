import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LessonService} from "../../../shared/services/lesson.service";

@Component({
    selector: 'app-end-lesson-modal',
  templateUrl: './end-lesson-modal.component.html',
  styleUrls: ['./end-lesson-modal.component.scss']
})
export class EndLessonModalComponent implements OnInit {
  @Output() onCloe: EventEmitter<void> = new EventEmitter<void>();
  @Input() lessonId: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lessonId: [this.lessonId],
      durationInMinutes: [null, [Validators.required]]
    })
  }

  endLesson(): void {
    if (this.form.valid) {
      this.lessonService.endLesson(this.form.value).subscribe(() => this.onCloe.emit());
    }
  }

}
