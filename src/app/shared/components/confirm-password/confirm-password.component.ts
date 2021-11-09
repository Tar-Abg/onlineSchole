import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, [Validators.required]]
    });
  }

  onConfirm(): void {
    if (this.form.valid) {
      this.confirm.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
