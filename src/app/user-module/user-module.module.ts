import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { LoginComponent } from './user-view-components/login/login.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { HomeComponent } from './user-view-components/home/home.component';
import { RegisterComponent } from './user-view-components/register/register.component';
import { DomainService } from '../user-module/services/domain/domain.service';
import { QuestionService } from '../user-module/services/question/question.service';



@NgModule({
  declarations: [
    LoginComponent,
    UploadDataComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    NgxSpinnerModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ],
  providers:[DomainService,QuestionService]
})
export class UserModule { }
