import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import { LoginHeaderComponent } from './login-header/login-header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoginHeaderComponent

  ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LoginHeaderComponent
    ]
})
export class LayoutsModule {
}
