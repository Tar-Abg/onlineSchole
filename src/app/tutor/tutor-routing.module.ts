import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {TutorSignUpComponent} from "./components/tutor-sign-up-steps/tutor-sign-up/tutor-sign-up.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'profileDetails', component: TutorSignUpComponent},
  {path: 'settings', loadChildren: () => import('../tutor-settings/tutor-settings.module').then(m => m.TutorSettingsModule)},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {}

