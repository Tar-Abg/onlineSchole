import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchTutorRoutingModule} from "./search-tutor-routing.module";
import {SearchTutorComponent} from './components/search-tutor/search-tutor.component';
import {LayoutsModule} from "../layouts/layouts.module";
import {FilterComponent} from './components/filter/filter.component';
import {TutorCardComponent} from './components/tutor-card/tutor-card.component';
import {SharedModule
} from "../shared/shared.module";


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
    SharedModule

  ]
})
export class SearchTutorModule {
}
