import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterHeaderComponent} from "./components/register-header/register-header.component";
import { StepsComponent } from './components/steps/steps.component';
import { SelectComponent } from './components/select/select.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent
  ],
    imports: [
        CommonModule,
        MatSelectModule,
    ],
  exports: [
    RegisterHeaderComponent,
    StepsComponent,
    SelectComponent
  ]
})
export class SharedModuleModule {
}
