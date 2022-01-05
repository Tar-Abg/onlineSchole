import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lesson-history-dashboard',
  templateUrl: './lesson-history-dashboard.component.html',
  styleUrls: ['./lesson-history-dashboard.component.scss']
})
export class LessonHistoryDashboardComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null],
    })
  }

}
