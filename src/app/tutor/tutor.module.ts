import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {TutorRoutingModule} from "./tutor-routing.module";
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SharedModule} from "../shared/shared.module";
import {StepOneComponent} from './components/step-one/step-one.component';
import {SecondStepComponent} from './components/second-step/second-step.component';
import {ThirdStepComponent} from './components/third-step/third-step.component';
import {FourthStepComponent} from './components/fourth-step/fourth-step.component';
import {FifthStepComponent} from './components/fifth-step/fifth-step.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TutorSignUpComponent} from './components/tutor-sign-up-steps/tutor-sign-up/tutor-sign-up.component';
import {TutorFirstStepComponent} from './components/tutor-sign-up-steps/tutor-first-step/tutor-first-step.component';
import {TutorSecondStepComponent} from './components/tutor-sign-up-steps/tutor-second-step/tutor-second-step.component';
import {TutorThirdStepComponent} from './components/tutor-sign-up-steps/tutor-third-step/tutor-third-step.component';
import {NgxMaskModule} from 'ngx-mask';
import { ConfirmRegisterComponent } from './components/confirm-register/confirm-register.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    StepOneComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FourthStepComponent,
    FifthStepComponent,
    TutorSignUpComponent,
    TutorFirstStepComponent,
    TutorSecondStepComponent,
    TutorThirdStepComponent,
    ConfirmRegisterComponent,
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot()
  ]
})
export class TutorModule {
}
