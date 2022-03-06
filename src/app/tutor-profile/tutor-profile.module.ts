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
import {StartLessonComponent} from './components/start-lesson/start-lesson.component';
import {EndLessonModalComponent} from './components/end-lesson-modal/end-lesson-modal.component';
import {CancelLessonModalComponent} from './components/cancel-lesson-modal/cancel-lesson-modal.component';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {StudentSettingsModule} from "../chat/chat.module";
import {LessonHistoryComponent} from './components/lesson-history/lesson-history.component';

@NgModule({
  declarations: [
    TutorProfileComponent,
    AvailabilityComponent,
    SubjectsComponent,
    CalendarComponent,
    RatingsComponent,
    ReviewsComponent,
    AddLessonComponent,
    StartLessonComponent,
    EndLessonModalComponent,
    CancelLessonModalComponent,
    ProfileInfoComponent,
    LessonHistoryComponent
  ],
    exports: [
        StartLessonComponent,
        RatingsComponent
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
        StudentSettingsModule,
    ]
})
export class TutorProfileModule {
}
