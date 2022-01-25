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


@NgModule({
  declarations: [
    StudentProfileComponent,
    ProfileInfoComponent,
  ],
    imports: [
        CommonModule,
        LayoutsModule,
        SharedModule,
        StudentProfileRoutingModule,
        TutorProfileModule,
        SearchTutorModule,
        StudentSettingsModule
    ]
})
export class StudentProfileModule { }
