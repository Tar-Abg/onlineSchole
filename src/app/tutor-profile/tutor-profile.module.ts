import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TutorProfileRoutingModule} from './tutor-profile-routing.module';
import {TutorProfileComponent} from './components/tutor-profile/tutor-profile.component';
import {AvailabilityComponent} from './components/availability/availability.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {RatingsComponent} from './components/ratings/ratings.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {RatingModule} from "ng-starrating";
import {TutorSettingsModule} from "../tutor-settings/tutor-settings.module";
import {AddLessonComponent} from './components/add-lesson/add-lesson.component';
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TutorProfileComponent,
    AvailabilityComponent,
    SubjectsComponent,
    CalendarComponent,
    RatingsComponent,
    ReviewsComponent,
    AddLessonComponent
  ],
    imports: [
        CommonModule,
        TutorProfileRoutingModule,
        LayoutsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        RatingModule,
        TutorSettingsModule,
        MatInputModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class TutorProfileModule {
}
