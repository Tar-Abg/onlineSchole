import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchTutorComponent} from "./components/search-tutor/search-tutor.component";

const routes: Routes = [
  {path: '', component: SearchTutorComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTutorRoutingModule {
}
