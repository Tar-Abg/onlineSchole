import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  {path: 'tutor', loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule)},
  {
    path: 'searchTutor',
    loadChildren: () => import('./search-tutor/search-tutor.module').then(m => m.SearchTutorModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
