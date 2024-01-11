import {BusinessAccountResponse} from "./account.model";

export interface ServiceResponse{
  id : number,
  name : string,
  shortDescription : string,
  longDescription : string,
  contactEmail : string,
  contactPhone : string,
  reviewsAverage : number,
  reviewsNumbers : number,
  imagesUrls : Array<String>,
  category : CategoryResponse,
  businessAccount : BusinessAccountResponse
}

export interface CategoryResponse{
  id : number,
  name : string,
  description : string
}

export interface ServiceRequest{
  name : string,
  shortDescription : string,
  longDescription : string,
  contactEmail : string,
  contactPhone : string,
  categoryId : number,
  businessAccountId : number
}

