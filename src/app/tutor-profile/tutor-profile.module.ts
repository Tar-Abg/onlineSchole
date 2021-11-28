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


@NgModule({
  declarations: [
    TutorProfileComponent,
    AvailabilityComponent,
    SubjectsComponent,
    CalendarComponent,
    RatingsComponent,
    ReviewsComponent
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
    ]
})
export class TutorProfileModule {
}
