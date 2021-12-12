import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StudentSignUpComponent} from "./components/student-sign-up/student-sign-up.component";
import {AuthGuardService as AuthGuard} from "../shared/guards/auth-guard.guard";

const routes: Routes = [
  {path: 'signUp', component: StudentSignUpComponent},
  {path: 'StudentProfileDetails', component: StudentSignUpComponent},
  {path: 'settings', loadChildren: () => import('../student-settings/student-settings.module').then(m => m.StudentSettingsModule)},
  // {path: 'settings', loadChildren: () => import('../student-settings/student-settings.module').then(m => m.StudentSettingsModule), canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
