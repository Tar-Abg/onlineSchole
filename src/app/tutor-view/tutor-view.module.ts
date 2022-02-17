import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TutorViewComponent } from './components/tutor-view/tutor-view.component';
import {TutorViewRoutingModule} from "./tutor-view-routing.module";
import {LayoutsModule} from "../layouts/layouts.module";
import {RatingModule} from "ng-starrating";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    TutorViewComponent
  ],
    imports: [
        CommonModule,
        TutorViewRoutingModule,
        LayoutsModule,
        RatingModule,
        MatCheckboxModule
    ]
})
export class TutorViewModule {
}
