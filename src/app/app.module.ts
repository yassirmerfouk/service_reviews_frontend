import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ServicesComponent } from './components/services/services.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ServiceComponent } from './components/service/service.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { MyServicesComponent } from './components/my-services/my-services.component';
import {AppInterceptorInterceptor} from "./interceptors/app-interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServicesComponent,
    CreateAccountComponent,
    ServiceComponent,
    CreateServiceComponent,
    MyServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
