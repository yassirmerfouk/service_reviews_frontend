import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm !: FormGroup;
  public errorMessage !: string;

  public constructor(
   private authService : AuthService,
    private formBuilder : FormBuilder,
   private router : Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email : this.formBuilder.control(null),
        password : this.formBuilder.control(null)
      }
    );
  }

  public handleLogin() : void{
    let email : string = this.loginForm.value.email;
    let password : string = this.loginForm.value.password;
    this.authService.login(email,password).subscribe(
      {
        next : (data) => {
          this.authService.loadUser(data.accessToken);
          this.authService.storeUserInStorage(data.accessToken);
          this.router.navigateByUrl("/");
        },
        error : (error) => {
          console.log(error);
          this.errorMessage = "Error in email / password";
        }
      }
    );
  }
}
