import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentSettingsComponent} from "./components/student-settings/student-settings.component";
import {ProfileInformationComponent} from './components/profile-information/profile-information.component';
import {StudentSettingsRoutingModule} from "./student-settings-routing.module";
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { SubjectsComponent } from './components/subjcts/subjects.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {SharedModuleModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    StudentSettingsComponent,
    ProfileInformationComponent,
    PersonalInformationComponent,
    SubjectsComponent,
    PaymentMethodComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    StudentSettingsRoutingModule,
    LayoutsModule,
    SharedModuleModule
  ]
})
export class StudentSettingsModule {
}
