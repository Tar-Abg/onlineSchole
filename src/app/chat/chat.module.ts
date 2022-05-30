import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {MessageDashboardComponent} from "./components/message-dashboard/message-dashboard.component";
import {MessageUsersListComponent} from "./components/message-users-list/message-users-list.component";
import {ReactiveFormsModule} from "@angular/forms"
import {NgxLinkifyjsModule} from 'ngx-linkifyjs';

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
        ReactiveFormsModule,
        NgxLinkifyjsModule
    ]
})
export class StudentSettingsModule {
}
