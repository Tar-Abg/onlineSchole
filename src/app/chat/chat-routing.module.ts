import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MessageDashboardComponent} from "./components/message-dashboard/message-dashboard.component";

const routes: Routes = [
  {
    path: '', component: MessageDashboardComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}

