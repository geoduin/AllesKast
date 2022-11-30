import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../../../../../libs/data/src';
import { AuthService } from '../../../../../../libs/services/src';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: LoginModel | undefined
  constructor(private auth: AuthService) { 
    
  }

  ngOnInit(): void {
    this.LoginForm = {
      UserName: "",
      Password: ""
    }
  }

  onSubmit(){
    console.log(this.auth.LoginEndpoint);
    this.auth.Login(this.LoginForm!);
  }
}
