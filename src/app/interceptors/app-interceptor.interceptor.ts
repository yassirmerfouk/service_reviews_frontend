import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {StateService} from "../services/state.service";

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private stateService : StateService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("auth")){
      let newRequest  = request.clone(
        {
          headers : request.headers.set("Authorization", "Bearer " + this.stateService.authState.accessToken)
        }
      );
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
