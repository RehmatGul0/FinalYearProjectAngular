import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { response } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder,private authService:AuthService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  signupForm:FormGroup = this.fb.group({
    email: ['',Validators.compose([Validators.email,Validators.required])],
    name: ['',Validators.compose([Validators.required])],
    password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
    confirmPassword: ['',Validators.compose([Validators.required,Validators.minLength(8)])]
  });
  submitted:boolean=false;
  onSubmit() {
    this.submitted=true;
    if(!this.signupForm.invalid){
      let _signUp={
        email:this.signupForm.get('email').value,
        name:this.signupForm.get('name').value,
        password:this.signupForm.get('password').value
      };
      this.spinner.show();
      this.authService.signup(_signUp)
      .subscribe((result: response < String > ) => {
        this.spinner.hide();
        this.router.navigate(['user/signin'])
        console.log(result);
      },
      (error: response < String > ) => {
        this.spinner.hide();
        console.log(error);
      });
    }
  }
  signIn(){
    this.router.navigate(['user/signin'])
  }
  get name(){
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
}
