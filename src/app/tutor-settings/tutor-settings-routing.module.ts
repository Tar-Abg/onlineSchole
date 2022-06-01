import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TutorSettingsComponent} from "./components/tutor-settings/tutor-settings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RatesComponent} from "./components/rates/rates.component";
import {AvailabilityComponent} from "./components/availability/availability.component";
import {SubjectsComponent} from "../shared/components/subjects/subjects.component";
import {ChangePasswordComponent} from "../shared/components/change-password/change-password.component";
import {TutorInstitutionsComponent} from "./components/tutor-institutions/tutor-institutions.component";
import {TutorCertificatesComponent} from "./components/tutor-certificates/tutor-certificates.component";
import {TutorPersonalInformationComponent} from "./components/tutor-personal-information/tutor-personal-information.component";
import {PaymentComponent} from "./components/payment/payment.component";


const routes: Routes = [
  {
    path: '', component: TutorSettingsComponent,
    children: [
      {path: '', component: ProfileComponent,  pathMatch: 'full' },
      {path: 'rates', component: RatesComponent},
      {path: 'rates', component: RatesComponent},
      {path: 'availability', component: AvailabilityComponent},
      {path: 'subjects', component: SubjectsComponent},
      {path: 'personal-information', component: TutorPersonalInformationComponent},
      {path: 'payment-method', component: PaymentComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'institutions', component: TutorInstitutionsComponent},
      {path: 'certificates', component: TutorCertificatesComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorSettingsRoutingModule {
}

