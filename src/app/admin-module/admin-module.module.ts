import { QuestionService } from './services/question/question.service';
import { DomainService } from './services/domain/domain.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';


import { LoginComponent } from './admin-view-components/login/login.component';
import { HomeComponent } from './admin-view-components/home/home.component';
import { AddModelInfoComponent } from './admin-view-components/add-model-info/add-model-info.component';
import { AddQuestionComponent } from './admin-view-components/add-question/add-question.component';
import { AddGetAlgorithmComponent } from './admin-view-components/add-get-algorithm/add-get-algorithm.component';
import { AddGetDomainComponent } from './admin-view-components/add-get-domain/add-get-domain.component';
import { AlgorithmService } from './services/algorithm/algorithm.service';
import { ModelInfoService } from './services/model-info/model-info.service';

@NgModule({
  declarations: [LoginComponent, HomeComponent, AddModelInfoComponent, AddQuestionComponent, AddGetAlgorithmComponent, AddGetDomainComponent],
  imports: [
    CookieService,
    NgxSpinnerModule,
    HttpClientModule,
    AgGridModule.withComponents(null),
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [DomainService,AlgorithmService,ModelInfoService,QuestionService],
})
export class AdminModuleModule { }
