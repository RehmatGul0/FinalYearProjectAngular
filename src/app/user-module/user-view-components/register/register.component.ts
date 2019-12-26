import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder) { }

  ngOnInit() {
  }
  signupForm:FormGroup = this.fb.group({
    email: ['',Validators.compose([Validators.email,Validators.required])],
    name: ['',Validators.compose([Validators.requiredTrue])],
    password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
    confirmPassword: ['',Validators.compose([Validators.required,Validators.minLength(8)])]
  });
  submitted:boolean=false;
  onSubmit() {
    this.submitted=true;
    if(!this.signupForm.invalid)
      this.router.navigate(['user/signin'])
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
