import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutorProfileComponent} from "./components/tutor-profile/tutor-profile.component";
import {
  AuthGuardService as AuthGuard
} from '../shared/guards/auth-guard.guard';

const routes: Routes = [
  {path: '', component: TutorProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorProfileRoutingModule {
}
