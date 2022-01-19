import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {MessageDashboardComponent} from "./components/message-dashboard/message-dashboard.component";
import {MessageUsersListComponent} from "./components/message-users-list/message-users-list.component";

@NgModule({
  declarations: [
    MessageDashboardComponent,
    MessageUsersListComponent
  ],
  exports: [
    MessageDashboardComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
  ]
})
export class StudentSettingsModule {
}
