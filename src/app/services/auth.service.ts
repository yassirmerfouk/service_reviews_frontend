import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = "http://localhost:8081/auth/login"

  constructor(
    private httpClient : HttpClient,
    private stateService : StateService
  ) { }

  public login(email : string, password : string) : Observable<any>{
    return this.httpClient.post(
      this.apiUrl,
      {
        email : email,
        password : password
      }
    )
  }

  public loadUser(accessToken : string) : void{
    let payload : any = jwtDecode(accessToken);
    this.stateService.authState = {
      isAuthenticated: true,
      email : payload.sub,
      id : payload.userId,
      roles : payload.scope,
      accessToken: accessToken
    };
  }

  public storeUserInStorage(accessToken : string) : void{
    localStorage.setItem("jwt", accessToken);
  }

  public loadUserFromLocalStorage() : void{
    let jwt = localStorage.getItem("jwt");
    if(jwt != null){
      this.loadUser(jwt);
    }
  }
}
