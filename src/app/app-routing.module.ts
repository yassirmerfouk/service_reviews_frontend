import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ServicesComponent} from "./components/services/services.component";
import {CreateAccountComponent} from "./components/create-account/create-account.component";
import {ServiceComponent} from "./components/service/service.component";
import {CreateServiceComponent} from "./components/create-service/create-service.component";
import {authenticationGuard} from "./guard/authentication.guard";
import {businessAuthorizationGuard} from "./guard/business-authorization.guard";
import {MyServicesComponent} from "./components/my-services/my-services.component";

const routes: Routes = [
  {path : "", component : ServicesComponent},
  {path : "login", component : LoginComponent},
  {path : "services", component : ServicesComponent},
  {path : "service/:id", component : ServiceComponent},
  {path : "create-account", component : CreateAccountComponent},
  {path : "create-service", component : CreateServiceComponent, canActivate : [authenticationGuard, businessAuthorizationGuard]},
  {path : "my-services", component : MyServicesComponent, canActivate :[authenticationGuard, businessAuthorizationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
