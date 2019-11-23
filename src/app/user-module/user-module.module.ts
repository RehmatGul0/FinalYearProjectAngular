import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from './user.routing';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './user-view-components/login/login.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { HomeComponent } from './user-view-components/home/home.component';
import { RegisterComponent } from './user-view-components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    UploadDataComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
