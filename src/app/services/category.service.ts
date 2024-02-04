import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryResponse} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = "http://localhost:8082/categories";
  constructor(private httpClient : HttpClient) { }

  public getAllCategories() : Observable<Array<CategoryResponse>> {
    return this.httpClient.get<Array<CategoryResponse>>(this.apiUrl);
  }
}
