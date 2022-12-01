import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../../../../../libs/data/src';
import { AuthService } from '../../../../../../libs/services/src';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  Warning: string
  LoginForm: LoginModel | undefined
  constructor(private auth: AuthService, private router: Router) { 
    this.Warning = "";
  }

  ngOnInit(): void {
    this.LoginForm = {
      UserName: "",
      Password: ""
    }
  }

  onSubmit(){
    console.log(this.auth.LoginEndpoint);
    const result = this.auth.Login(this.LoginForm!).subscribe((waarde)=>{
      if(waarde){
        this.Warning = "";
          this.router.navigate(["/"]);
          console.log("Login succesfull");
      } else{
        console.log("Niet ingelogd");
        this.Warning = "Onjuiste gegevens ingevoerd";
      }
    });
  }

  ngOnDestroy(): void {
      
  }
}
