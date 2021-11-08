import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterHeaderComponent} from "./components/register-header/register-header.component";
import {StepsComponent} from './components/steps/steps.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";
import {InstitutionsComponent} from './components/institutions/institutions.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {CertificatesComponent} from './components/certificates/certificates.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent,
    InstitutionsComponent,
    CertificatesComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent,
    InstitutionsComponent,
    CertificatesComponent
  ]
})
export class SharedModuleModule {
}
