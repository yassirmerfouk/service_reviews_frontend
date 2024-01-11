import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceRequest, ServiceResponse} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl : string = "http://localhost:8080/SERVICES-MICROSERVICE/services"
  constructor(
    private httpClient : HttpClient
  ) { }

  public getAllServices() : Observable<Array<ServiceResponse>>{
    return this.httpClient.get<Array<ServiceResponse>>(this.apiUrl);
  }

  public getServicesByCategory(categoryId : number) : Observable<Array<ServiceResponse>>{
    return this.httpClient.get<Array<ServiceResponse>>(this.apiUrl + "/categories/" +categoryId);
  }

  public getService(id : number) : Observable<ServiceResponse> {
    return this.httpClient.get<ServiceResponse>(this.apiUrl + "/" + id);
  }

  public createService(service : ServiceRequest, image : File) : Observable<ServiceResponse>{
    const form = new FormData();
    form.append('image', image);
    form.append('service',new Blob([JSON.stringify(service)],{ type: 'application/json' }));
    return this.httpClient.post<ServiceResponse>(
      this.apiUrl,
      form
    )
  }
}
