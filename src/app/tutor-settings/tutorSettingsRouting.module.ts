import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TutorSettingsComponent} from "./components/tutor-settings/tutor-settings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RatesComponent} from "./components/rates/rates.component";
import {AvailabilityComponent} from "./components/availability/availability.component";
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {PersonalInformationComponent} from "./components/personal-information/personal-information.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";


const routes: Routes = [
  {
    path: '', component: TutorSettingsComponent,
    children: [
      {path: '', component: ProfileComponent,  pathMatch: 'full' },
      {path: 'rates', component: RatesComponent},
      {path: 'rates', component: RatesComponent},
      {path: 'availability', component: AvailabilityComponent},
      {path: 'subjects', component: SubjectsComponent},
      {path: 'personal-information', component: PersonalInformationComponent},
      {path: 'payment-methode', component: PaymentComponent},
      {path: 'change-password', component: ChangePasswordComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorSettingsRoutingModule {
}

