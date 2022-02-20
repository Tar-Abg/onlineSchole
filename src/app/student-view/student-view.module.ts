import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentViewComponent} from './components/student-view/student-view.component';
import {TutorViewRoutingModule} from "./student-view-routing.module";
import {LayoutsModule} from "../layouts/layouts.module";


@NgModule({
  declarations: [
    StudentViewComponent
  ],
  imports: [
    CommonModule,
    TutorViewRoutingModule,
    LayoutsModule
  ]
})
export class StudentViewModule { }
