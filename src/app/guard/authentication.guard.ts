import {CanActivateFn, Router} from '@angular/router';
import {StateService} from "../services/state.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  let stateService : StateService = inject(StateService);
  let router : Router = inject(Router);
  if(!stateService.authState.isAuthenticated){
    router.navigateByUrl("/");
    return false;
  }
  return true;
};
