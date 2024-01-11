import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusinessAccountRequest, PersonnelAccountRequest} from "../../model/account.model";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{

  public createAccountForm !: FormGroup;
  public errorMessage !: string;
  public successMessage !: string;
  public constructor(
    private formBuilder : FormBuilder,
    private accountService : AccountService
  ) {
  }

  ngOnInit() {
    this.createAccountForm = this.formBuilder.group(
      {
        type : this.formBuilder.control("PERSONNEL"),
        email : this.formBuilder.control(null, ),
        password : this.formBuilder.control(null, ),
        firstName : this.formBuilder.control(null,),
        lastName : this.formBuilder.control(null,),
        name : this.formBuilder.control(null,),
        address : this.formBuilder.control(null,),
        employeesNumber : this.formBuilder.control(null,),
        description : this.formBuilder.control(null)
      }
    );
  }

  public getPersonnelAccounts() : void{
    this.accountService.getPersonnelAccounts().subscribe(
      {
        next : (data) => console.log(data),
        error : (error) => {
          console.log('error');
          console.log(error);
    }
      }
    );
  }

  public handleCreateAccount() : void{
    if(this.createAccountForm.value.type == "PERSONNEL"){
      let personnelAccount : PersonnelAccountRequest = this.createAccountForm.value;
      this.accountService.createPersonnelAccount(personnelAccount).subscribe(
        {
          next : (data) => {
            this.successMessage = "Your personnel account is created with success";
            console.log(data);
          },
          error : (error) => {
            this.errorMessage = error;
            console.log(error);
          }
        }
      );
    }else if(this.createAccountForm.value.type == "BUSINESS"){
      let businessAccount : BusinessAccountRequest = this.createAccountForm.value;
      this.accountService.createBusinessAccount(businessAccount).subscribe(
        {
          next : (data) => {
            this.successMessage = "Your business account is created with success";
            console.log(data);
          },
          error : (error) => {
            this.errorMessage = error.value;
            console.log(error);
          }
        }
      );
    }
  }
}
