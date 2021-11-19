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
import { MessageComponent } from './components/message/message.component';
import {RouterModule} from "@angular/router";


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
    MessageComponent
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
    MessageComponent
  ]
})
export class SharedModule {
}
