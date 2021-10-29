import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {LoginComponent} from "./components/login/login.component";
import {StudentSignUpComponent} from "./components/student-sign-up/student-sign-up.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: StudentSignUpComponent},
  {path: 'StudentProfileDetails', component: StudentSignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
