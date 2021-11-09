import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentSettingsComponent} from "./components/student-settings/student-settings.component";
import {ProfileInformationComponent} from './components/profile-information/profile-information.component';
import {StudentSettingsRoutingModule} from "./student-settings-routing.module";
import {SubjectsComponent} from './components/subjcts/subjects.component';
import {PaymentMethodComponent} from './components/payment-method/payment-method.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {SharedModuleModule} from "../shared/shared.module";
import {StudentPersonalInformationComponent} from './components/student-personal-information/student-personal-information.component';


@NgModule({
  declarations: [
    StudentSettingsComponent,
    ProfileInformationComponent,
    SubjectsComponent,
    PaymentMethodComponent,
    ChangePasswordComponent,
    StudentPersonalInformationComponent,
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
