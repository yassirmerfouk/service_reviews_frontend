export interface PersonnelAccountRequest {
  email : string,
  password : string,
  firstName: string,
  lastName : string
}
export interface PersonnelAccountResponse{
  id : number,
  email : string,
  firstName: string,
  lastName : string
}

export interface BusinessAccountRequest{
  email : string,
  password : string,
  name : string,
  address : string,
  employeesNumber : string,
  description : string
}

export interface BusinessAccountResponse{
  id : number,
  email : string,
  name : string,
  address : string,
  employeesNumber : string,
  description : string
}
