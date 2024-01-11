import {CanActivateFn, Router} from '@angular/router';
import {StateService} from "../services/state.service";
import {inject} from "@angular/core";

export const businessAuthorizationGuard: CanActivateFn = (route, state) => {
  let stateService : StateService = inject(StateService);
  let router : Router = inject(Router);
  if(!stateService.authState.roles.includes("BUSINESS")){
    router.navigateByUrl("/");
    return false;
  }
  return true;
};
