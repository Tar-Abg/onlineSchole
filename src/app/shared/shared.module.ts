import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterHeaderComponent} from "./components/register-header/register-header.component";
import {StepsComponent} from './components/steps/steps.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";
import {InstitutionsComponent} from './components/institutions/institutions.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {CertificatesComponent} from './components/certificates/certificates.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PersonalInformationComponent} from './components/personal-information/personal-information.component';
import {ConfirmPasswordComponent} from './components/confirm-password/confirm-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MessageComponent} from './components/message/message.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from './components/login/login.component';
import {ModalSchemComponent} from './components/modal-schem/modal-schem.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ChangePasswordModalComponent} from './components/change-password-modal/change-password-modal.component';
import {MessageModalComponent} from './components/message-modal/message-modal.component';
import {JobsBoardDashboardComponent} from './components/jobs-board-dashboard/jobs-board-dashboard.component';
import {PaymentDashboardComponent} from './components/payment-dashboard/payment-dashboard.component';
import {LessonHistoryDashboardComponent} from './components/lesson-history-dashboard/lesson-history-dashboard.component';


@NgModule({
  declarations: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent,
    InstitutionsComponent,
    CertificatesComponent,
    PersonalInformationComponent,
    ConfirmPasswordComponent,
    ChangePasswordComponent,
    SubjectsComponent,
    PaginationComponent,
    MessageComponent,
    LoginComponent,
    ModalSchemComponent,
    ResetPasswordComponent,
    ChangePasswordModalComponent,
    MessageModalComponent,
    JobsBoardDashboardComponent,
    PaymentDashboardComponent,
    LessonHistoryDashboardComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule,
  ],
  exports: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent,
    InstitutionsComponent,
    CertificatesComponent,
    PersonalInformationComponent,
    PaginationComponent,
    MessageComponent,
    ModalSchemComponent,
    ResetPasswordComponent,
    ChangePasswordModalComponent,
    MessageModalComponent,
    LoginComponent,
    JobsBoardDashboardComponent,
    PaymentDashboardComponent,
    LessonHistoryDashboardComponent
  ]
})
export class SharedModule {
}
