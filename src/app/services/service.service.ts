import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewRequest, ReviewResponse, ServiceRequest, ServiceResponse} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl: string = "http://localhost:8082/services"

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getAllServices(): Observable<Array<ServiceResponse>> {
    return this.httpClient.get<Array<ServiceResponse>>(this.apiUrl);
  }

  public getServicesByCategory(categoryId: number): Observable<Array<ServiceResponse>> {
    return this.httpClient.get<Array<ServiceResponse>>(this.apiUrl + "/categories/" + categoryId);
  }

  public getServicesByBusinessAccountId(businessAccountId: number): Observable<Array<ServiceResponse>> {
    return this.httpClient.get<Array<ServiceResponse>>(
      this.apiUrl + "/accounts/business/" + businessAccountId
    );
  }

  public getService(id: number): Observable<ServiceResponse> {
    return this.httpClient.get<ServiceResponse>(this.apiUrl + "/" + id);
  }

  public createService(service: ServiceRequest, image: File): Observable<ServiceResponse> {
    const form = new FormData();
    form.append('image', image);
    form.append('service', new Blob([JSON.stringify(service)], {type: 'application/json'}));
    return this.httpClient.post<ServiceResponse>(
      this.apiUrl,
      form
    )
  }

  public deleteService(id: number): Observable<any> {
    return this.httpClient.delete(
      this.apiUrl + "/" + id
    );
  }

  public getServiceReviews(serviceId : number) : Observable<Array<ReviewResponse>>{
    return this.httpClient.get<Array<ReviewResponse>>(
      this.apiUrl + "/" + serviceId + "/reviews"
    )
  }

  public personnelAccountDidReview(personnelAccountId: number, serviceId : number) : Observable<boolean>{
    return this.httpClient.get<boolean>(
      "http://localhost:8083/reviews/accounts/"+personnelAccountId+"/service/" +serviceId
    );
  }

  public addReview(review : ReviewRequest) : Observable<any>{
    return this.httpClient.post(
      this.apiUrl + "/reviews",
      review
    );
  }
}
