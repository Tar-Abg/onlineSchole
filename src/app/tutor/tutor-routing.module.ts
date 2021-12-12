import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {TutorSignUpComponent} from "./components/tutor-sign-up-steps/tutor-sign-up/tutor-sign-up.component";
import {AuthGuardService as AuthGuard} from "../shared/guards/auth-guard.guard";

const routes: Routes = [
  {path: 'signUp', component: SignUpComponent},
  {path: 'profileDetails', component: TutorSignUpComponent},
  // {path: 'settings', loadChildren: () => import('../tutor-settings/tutor-settings.module').then(m => m.TutorSettingsModule), canActivate: [AuthGuard]},
  {path: 'settings', loadChildren: () => import('../tutor-settings/tutor-settings.module').then(m => m.TutorSettingsModule)},
  {path: 'profile', loadChildren: () => import('../tutor-profile/tutor-profile.module').then(m => m.TutorProfileModule)},
  // {path: 'profile', loadChildren: () => import('../tutor-profile/tutor-profile.module').then(m => m.TutorProfileModule), canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {}

