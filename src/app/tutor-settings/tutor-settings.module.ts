import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TutorSettingsRoutingModule} from "./tutor-settings-routing.module";
import {TutorSettingsComponent} from "./components/tutor-settings/tutor-settings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RatesComponent} from "./components/rates/rates.component";
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {AvailabilityComponent} from "./components/availability/availability.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModuleModule} from "../shared/shared.module";
import {TutorInstitutionsComponent} from "./components/tutor-institutions/tutor-institutions.component";
import {TutorCertificatesComponent} from "./components/tutor-certificates/tutor-certificates.component";
import {LayoutsModule} from "../layouts/layouts.module";
import {MatTabsModule} from "@angular/material/tabs";
import {TutorPersonalInformationComponent} from './components/tutor-personal-information/tutor-personal-information.component';


@NgModule({
  declarations: [
    TutorSettingsComponent,
    ProfileComponent,
    SubjectsComponent,
    PaymentComponent,
    ChangePasswordComponent,
    AvailabilityComponent,
    RatesComponent,
    TutorInstitutionsComponent,
    TutorCertificatesComponent,
    TutorPersonalInformationComponent

  ],
  imports: [
    CommonModule,
    TutorSettingsRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    LayoutsModule,
    MatTabsModule

  ]
})
export class TutorSettingsModule {
}
