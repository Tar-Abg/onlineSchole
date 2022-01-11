import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TutorService} from "../../services/tutor-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cancel-lesson-modal',
  templateUrl: './cancel-lesson-modal.component.html',
  styleUrls: ['./cancel-lesson-modal.component.scss']
})
export class CancelLessonModalComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  @Output() onCloe: EventEmitter<void> = new EventEmitter<void>();
  @Input() lessonId: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      lessonId: [this.lessonId],
      cancelationDescription: [null, [Validators.required]],
      cancelationFee: [null, [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.cancelLesson();
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancelLesson(): void {
    this.subscription.add(
      this.tutorService.cancelLesson(this.form.value).subscribe(() => this.onCloe.emit())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
