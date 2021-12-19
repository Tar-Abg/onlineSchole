import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {TutorSignUpComponent} from "./components/tutor-sign-up-steps/tutor-sign-up/tutor-sign-up.component";
import {StepOneComponent} from "./components/step-one/step-one.component";
import {SecondStepComponent} from "./components/second-step/second-step.component";
import {ThirdStepComponent} from "./components/third-step/third-step.component";
import {FourthStepComponent} from "./components/fourth-step/fourth-step.component";
import {FifthStepComponent} from "./components/fifth-step/fifth-step.component";
import {TutorFirstStepComponent} from "./components/tutor-sign-up-steps/tutor-first-step/tutor-first-step.component";
import {TutorSecondStepComponent} from "./components/tutor-sign-up-steps/tutor-second-step/tutor-second-step.component";
import {TutorThirdStepComponent} from "./components/tutor-sign-up-steps/tutor-third-step/tutor-third-step.component";

const routes: Routes = [
  {
    path: 'signUp', component: SignUpComponent,
    children: [
      {path: 'step-one', component: StepOneComponent},
      {path: 'step-two', component: SecondStepComponent},
      {path: 'step-three', component: ThirdStepComponent},
      {path: 'step-four', component: FourthStepComponent},
      {path: 'step-five', component: FifthStepComponent},
      {path: '', redirectTo: 'step-one'},
    ]
  },
  {
    path: 'profileDetails', component: TutorSignUpComponent,
    children: [
      {path: 'step-one', component: TutorFirstStepComponent},
      {path: 'step-two', component: TutorSecondStepComponent},
      {path: 'step-three', component: TutorThirdStepComponent},
      {path: '', redirectTo: 'step-one'},
    ]
  },
  // {path: 'settings', loadChildren: () => import('../tutor-settings/tutor-settings.module').then(m => m.TutorSettingsModule), canActivate: [AuthGuard]},
  {
    path: 'settings',
    loadChildren: () => import('../tutor-settings/tutor-settings.module').then(m => m.TutorSettingsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../tutor-profile/tutor-profile.module').then(m => m.TutorProfileModule)
  },
  // {path: 'profile', loadChildren: () => import('../tutor-profile/tutor-profile.module').then(m => m.TutorProfileModule), canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {
}

