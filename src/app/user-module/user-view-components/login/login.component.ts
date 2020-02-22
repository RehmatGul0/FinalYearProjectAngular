import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { response, SignIn } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private fb: FormBuilder,private authService:AuthService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  loginForm:FormGroup = this.fb.group({
    email: ['',Validators.compose([Validators.email,Validators.required])],
    password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
  });
  submitted:boolean = false;
  onSubmit() {
    this.submitted=true;
    if(!this.loginForm.invalid){
      let _signIn={
        email:this.loginForm.get('email').value,
        password:this.loginForm.get('password').value
      };
      this.spinner.show();
      this.authService.signin(_signIn)
      .subscribe((result: response<SignIn>) => {
        console.log(result)
        sessionStorage.setItem('admin_token',result.result.token)
        this.spinner.hide();
        this.router.navigate(['user/home'])
        console.log('success');
      },
      (error: response < String > ) => {
        this.spinner.hide();
        console.log(error);
      });
    }
      
  }
  signUp(){
    this.router.navigate(['user/signup'])
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}