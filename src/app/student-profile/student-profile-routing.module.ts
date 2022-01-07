import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentProfileComponent} from "./components/student-profile/student-profile.component";
import {
  AuthGuardService as AuthGuard
} from '../shared/guards/auth-guard.guard';

const routes: Routes = [
  {path: '', component: StudentProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProfileRoutingModule {
}
