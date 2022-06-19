import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LessonService} from "../../../shared/services/lesson.service";
import {LessonSchedule} from "../../models/tutor.model";

@Component({
    selector: 'app-end-lesson-modal',
  templateUrl: './end-lesson-modal.component.html',
  styleUrls: ['./end-lesson-modal.component.scss']
})
export class EndLessonModalComponent implements OnInit {
  @Output() onCloe: EventEmitter<void> = new EventEmitter<void>();
  @Input() lesson: LessonSchedule;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      lessonId: [this.lesson.id],
      durationInMinutes: [null, [Validators.required]]
    })
  }

  endLesson(): void {
    if (this.form.valid) {
      this.lessonService.endLesson(this.form.value).subscribe(() => {
        this.onCloe.emit();
      });
    }
  }

}
