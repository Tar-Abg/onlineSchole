import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrHeaderComponent} from "./components/registr-header/registr-header.component";
import { StepsComponent } from './components/steps/steps.component';
import { SelectComponent } from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    RegistrHeaderComponent,
    StepsComponent,
    SelectComponent
  ],
    imports: [
        CommonModule,
        MatSelectModule,
    ],
  exports: [
    RegistrHeaderComponent,
    StepsComponent,
    SelectComponent
  ]
})
export class SharedModuleModule {
}
