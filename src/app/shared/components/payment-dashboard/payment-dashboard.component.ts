import { Component, OnInit } from '@angular/core';
import {TutorService} from "../../../tutor-profile/services/tutor-service.service";
import {StorageService} from "../../services/storage/storage.service";
import {Observable} from "rxjs";
import {LastPayment, PaymentHistoryResponse, TotalPayment} from "../../../tutor-profile/models/tutor.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserRole} from "../../models/auth.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})
export class PaymentDashboardComponent implements OnInit {
  total$: Observable<TotalPayment>;
  lastPayments$: Observable<LastPayment[]>;
  paymentHistory$: Observable<PaymentHistoryResponse>;
  form: FormGroup;
  userId: number;
  userRole: string;

  constructor(
    private tutorService: TutorService,
    private studentService: StudentProfileService,
    private storageService: StorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userRole = UserRole[this.storageService.getUserType()];

    this.userId = this.storageService.getUserId();
    this.total$ = this.tutorService.getTotalPayments(this.userId);
    this.initializeForm();
  }

  getLastPayment(): void {
    this.lastPayments$ = this.userRole === 'tutor' ? this.tutorService.getLastPayments(this.userId) : this.studentService.getLastPayments(this.userId);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null],
    })
  }

  onSubmit(): void {
    this.paymentHistory$ = this.userRole === 'tutor' ?
      this.tutorService.getPaymentHistory(this.userId, this.form.value.from, this.form.value.to) :
      this.studentService.getPaymentHistory(this.userId, this.form.value.from, this.form.value.to);
  }

}
