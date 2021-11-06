import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TutorSettingsRoutingModule} from "./tutorSettingsRouting.module";
import {TutorSettingsComponent} from "./components/tutor-settings/tutor-settings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RatesComponent} from "./components/rates/rates.component";
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {PersonalInformationComponent} from "./components/personal-information/personal-information.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {AvailabilityComponent} from "./components/availability/availability.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModuleModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    TutorSettingsComponent,
    ProfileComponent,
    SubjectsComponent,
    PersonalInformationComponent,
    PaymentComponent,
    ChangePasswordComponent,
    AvailabilityComponent,
    RatesComponent,

  ],
  imports: [
    CommonModule,
    TutorSettingsRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule

  ]
})
export class TutorSettingsModule {
}
