import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LessonSchedule} from "../../models/tutor.model";
import {LessonService} from "../../../shared/services/lesson.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-end-lesson-for-student',
  templateUrl: './end-lesson-for-student.component.html',
  styleUrls: ['./end-lesson-for-student.component.scss']
})
export class EndLessonForStudentComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() lesson: LessonSchedule;
  private readonly subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(
    private lessonService: LessonService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  endLesson(): void {
    this.subscription.add(
      this.lessonService.studentEndLesson(this.form.value).subscribe(() => {
        this.close.emit();
      })
    )
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      lessonId: [this.lesson.id],
      rate: [5, [Validators.required]],
      review: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.endLesson();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
