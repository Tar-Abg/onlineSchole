import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing/landing.component';
import {LayoutsModule} from "./layouts/layouts.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpRequestInterceptor} from "./interceptors/loading.interceptor";
import {SharedModule} from "./shared/shared.module";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NotFoundModalComponent} from './components/not-found-modal/not-found-modal.component';
import {NgImageSliderModule} from "ng-image-slider";
import {RatingModule} from "ng-starrating";


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    NotFoundModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        NgbModule,
        SharedModule,
        NgImageSliderModule,
        RatingModule
    ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}

  ],
  exports: [
    MatInputModule,
    MatMomentDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
