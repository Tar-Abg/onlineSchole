import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {StudentSignUpComponent} from "./components/student-sign-up/student-sign-up.component";
import {StudentFirstStepComponent} from "./components/student-first-step/student-first-step.component";
import {StudentSecondStepComponent} from "./components/student-second-step/student-second-step.component";
import {StudentThirdStepComponent} from "./components/student-third-step/student-third-step.component";
import {StudentFourthStepComponent} from "./components/student-fourth-step/student-fourth-step.component";
import {StudentFifthStepComponent} from "./components/student-fifth-step/student-fifth-step.component";
import {StudentProfileComponent} from "../student-profile/components/student-profile/student-profile.component";

const routes: Routes = [
  {
    path: 'signUp', component: StudentSignUpComponent, children: [
      {path: 'step-one', component: StudentFirstStepComponent},
      {path: 'step-two', component: StudentSecondStepComponent},
      {path: 'step-three', component: StudentThirdStepComponent},
      {path: 'step-four', component: StudentFourthStepComponent},
      {path: 'step-five', component: StudentFifthStepComponent},
      {path: '', redirectTo: 'step-one'},
    ]
  },
  {path: 'StudentProfileDetails', component: StudentSignUpComponent},
  {path: 'profile', component: StudentProfileComponent},
  {
    path: 'settings',
    loadChildren: () => import('../student-settings/student-settings.module').then(m => m.StudentSettingsModule)
  },
  // {path: 'settings', loadChildren: () => import('../student-settings/student-settings.module').then(m => m.StudentSettingsModule), canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
