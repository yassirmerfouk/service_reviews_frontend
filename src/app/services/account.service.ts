import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BusinessAccountRequest,
  BusinessAccountResponse,
  PersonnelAccountRequest,
  PersonnelAccountResponse
} from "../model/account.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl : string = "http://localhost:8081/accounts";
  constructor(
    private httpClient : HttpClient
  ) { }

  public createPersonnelAccount(personnelAccount : PersonnelAccountRequest) : Observable<PersonnelAccountResponse>{
    return this.httpClient.post<PersonnelAccountResponse>(
      this.apiUrl + "/personnel",
      personnelAccount
    )
  }

  public createBusinessAccount(businessAccount : BusinessAccountRequest) : Observable<BusinessAccountResponse>{
    return this.httpClient.post<BusinessAccountResponse>(
      this.apiUrl + "/business",
      businessAccount
    );
  }

  public getPersonnelAccounts() : Observable<Array<PersonnelAccountResponse>>{
    return this.httpClient.get<Array<PersonnelAccountResponse>>(this.apiUrl + "/personnel");
  }
}
