import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TutorViewComponent } from './components/tutor-view/tutor-view.component';
import {TutorViewRoutingModule} from "./tutor-view-routing.module";


@NgModule({
  declarations: [
    TutorViewComponent
  ],
  imports: [
    CommonModule,
    TutorViewRoutingModule
  ]
})
export class TutorViewModule {
}
