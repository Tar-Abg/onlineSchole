import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentSettingsComponent} from "./components/student-settings/student-settings.component";
import {ProfileInformationComponent} from "./components/profile-information/profile-information.component";
import {SubjectsComponent} from "../shared/components/subjects/subjects.component";
import {ChangePasswordComponent} from "../shared/components/change-password/change-password.component";
import {StudentPersonalInformationComponent} from "./components/student-personal-information/student-personal-information.component";
import {PaymentMethodComponent} from "../shared/components/payment-method/payment-method.component";


const routes: Routes = [
  {
    path: '', component: StudentSettingsComponent,
    children: [
      {path: '', component: ProfileInformationComponent},
      {path: 'subjects', component: SubjectsComponent},
      {path: 'personalInformation', component: StudentPersonalInformationComponent},
      {path: 'paymentMethod', component: PaymentMethodComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentSettingsRoutingModule {
}

