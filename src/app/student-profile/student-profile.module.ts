import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {SharedModule} from "../shared/shared.module";
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';



@NgModule({
  declarations: [
    StudentProfileComponent,
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    SharedModule
  ]
})
export class StudentProfileModule { }
