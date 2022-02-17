import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentProfileComponent} from './components/student-profile/student-profile.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {SharedModule} from "../shared/shared.module";
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {StudentProfileRoutingModule} from "./student-profile-routing.module";
import {TutorProfileModule} from "../tutor-profile/tutor-profile.module";
import {SearchTutorModule} from "../search-tutor/search-tutor.module";
import {StudentSettingsModule} from "../chat/chat.module";
import {LessonHistoryComponent} from './components/lesson-history/lesson-history.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    StudentProfileComponent,
    ProfileInfoComponent,
    LessonHistoryComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    SharedModule,
    StudentProfileRoutingModule,
    TutorProfileModule,
    SearchTutorModule,
    StudentSettingsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule
  ]
})
export class StudentProfileModule {
}
