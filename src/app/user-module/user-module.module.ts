import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';  //<<<< import it here

import { LoginComponent } from './user-view-components/login/login.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { HomeComponent } from './user-view-components/home/home.component';
import { RegisterComponent } from './user-view-components/register/register.component';
import { DataService } from './services/data/data.service';
import { DomainService } from '../user-module/services/domain/domain.service';
import { QuestionService } from '../user-module/services/question/question.service';
import { UserNavComponent } from './user-view-components/user-nav/user-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    LoginComponent,
    UploadDataComponent,
    HomeComponent,
    RegisterComponent,
    UserNavComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ],
  providers:[DomainService,QuestionService,DataService]
})
export class UserModule { }
