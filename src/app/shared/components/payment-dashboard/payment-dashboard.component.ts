import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from "../../../tutor-profile/services/tutor-service.service";
import {StorageService} from "../../services/storage/storage.service";
import {Observable, Subscription} from "rxjs";
import {
  LastPayment,
  PaymentDetail,
  PaymentHistoryResponse,
  TotalPayment
} from "../../../tutor-profile/models/tutor.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserRole} from "../../models/auth.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.scss']
})
export class PaymentDashboardComponent implements OnInit, OnDestroy {
  readonly subscription: Subscription = new Subscription();
  total$: Observable<TotalPayment>;
  lastPayments$: Observable<LastPayment[]>;
  paymentHistory$: Observable<PaymentHistoryResponse>;
  form: FormGroup;
  paymentDetail: PaymentDetail
  userId: number;
  userRole: string;
  isOpenPaymentDetails: boolean;

  constructor(
    private tutorService: TutorService,
    private studentService: StudentProfileService,
    private storageService: StorageService,
    private fileService: FileService,
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
      this.tutorService.getPaymentHistory(this.userId, this.form.value.from?.toISOString(), this.form.value.to?.toISOString()) :
      this.studentService.getPaymentHistory(this.userId, this.form.value.from?.toISOString(), this.form.value.to?.toISOString());
  }

  getDetails(id: number): void {
    this.isOpenPaymentDetails = true;
    this.userRole === 'student' ? this.getCertainPaymentStudent(id) : this.getCertainPaymentTutor(id);
  }

  getCertainPaymentStudent(id: number): void {
    this.subscription.add(
      this.studentService.getCertainPayment(id).subscribe((data) => {
        this.paymentDetail = data;
      })
    )
  }

  getCertainPaymentTutor(id: number): void {
    this.subscription.add(
      this.tutorService.getCertainPayment(id).subscribe((data) => {
        this.paymentDetail = data;
      })
    )
  }


  printPayment(): void {
    this.userRole === 'student' ? this.getPaymentHistoryPrintableStudent() : this.getPaymentHistoryPrintableTutor();
  }

  getPaymentHistoryPrintableStudent(): void {
    this.subscription.add(
      this.studentService.getPaymentHistoryPrintable(this.userId, this.form.value.from.toISOString(), this.form.value.to.toISOString()).subscribe((data) => {
        this.fileService.download(data.contentType, data.fileContents, data.fileDownloadName);
      })
    )
  }

  getPaymentHistoryPrintableTutor(): void {
    this.subscription.add(
      this.tutorService.getPaymentHistoryPrintable(this.userId, this.form.value.from.toISOString(), this.form.value.to.toISOString()).subscribe((data) => {
        this.fileService.download(data.contentType, data.fileContents, data.fileDownloadName);
      })
    )
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}
