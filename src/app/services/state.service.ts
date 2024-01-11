import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public authState = {
    isAuthenticated : false,
    email : "",
    id : "",
    roles : "",
    accessToken : "",
  }

  constructor() { }
}
