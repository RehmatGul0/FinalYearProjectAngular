import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder) { }

  ngOnInit() {
  }

  loginForm:FormGroup = this.fb.group({
    email: ['',Validators.compose([Validators.email,Validators.required])],
    password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
  });

  submitted:boolean = false;

  onSubmit() {
    this.submitted=true;
    if(!this.loginForm.invalid)
      this.router.navigate(['admin/home'])
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
