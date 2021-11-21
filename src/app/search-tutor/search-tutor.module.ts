import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchTutorRoutingModule} from "./search-tutor-routing.module";
import {SearchTutorComponent} from './components/search-tutor/search-tutor.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {FilterComponent} from './components/filter/filter.component';
import {TutorCardComponent} from './components/tutor-card/tutor-card.component';
import {
  SharedModule
} from "../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SearchTutorComponent,
    FilterComponent,
    TutorCardComponent
  ],
    imports: [
        CommonModule,
        SearchTutorRoutingModule,
        LayoutsModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class SearchTutorModule {
}
