import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {StudentRoutingModule} from "./student-routing.module";
import {StudentSignUpComponent} from './components/student-sign-up/student-sign-up.component';
import {StudentFirstStepComponent} from './components/student-first-step/student-first-step.component';
import {StudentSecondStepComponent} from './components/student-second-step/student-second-step.component';
import {StudentThirdStepComponent} from './components/student-third-step/student-third-step.component';
import {StudentFourthStepComponent} from './components/student-fourth-step/student-fourth-step.component';
import {StudentFifthStepComponent} from './components/student-fifth-step/student-fifth-step.component';
import {SharedModule} from "../shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LoginComponent,
    StudentSignUpComponent,
    StudentFirstStepComponent,
    StudentSecondStepComponent,
    StudentThirdStepComponent,
    StudentFourthStepComponent,
    StudentFifthStepComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule
  ],
})
export class StudentModule {
}
