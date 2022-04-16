import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'notFound', component: NotFoundComponent},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  {path: 'tutor', loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule)},
  {path: 'tutorView/:id', loadChildren: () => import('./tutor-view/tutor-view.module').then(m => m.TutorViewModule)},
  {path: 'studentView/:id', loadChildren: () => import('./student-view/student-view.module').then(m => m.StudentViewModule)},
  {
    path: 'searchTutor',
    loadChildren: () => import('./search-tutor/search-tutor.module').then(m => m.SearchTutorModule)
  },
  {path: '**', redirectTo: 'notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
