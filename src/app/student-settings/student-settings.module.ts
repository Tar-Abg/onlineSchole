import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentSettingsComponent} from "./components/student-settings/student-settings.component";
import {ProfileInformationComponent} from './components/profile-information/profile-information.component';
import {StudentSettingsRoutingModule} from "./student-settings-routing.module";
import {PaymentMethodComponent} from './components/payment-method/payment-method.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {SharedModuleModule} from "../shared/shared.module";
import {StudentPersonalInformationComponent} from './components/student-personal-information/student-personal-information.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StudentSettingsComponent,
    ProfileInformationComponent,
    PaymentMethodComponent,
    StudentPersonalInformationComponent,
  ],
  imports: [
    CommonModule,
    StudentSettingsRoutingModule,
    LayoutsModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class StudentSettingsModule {
}
