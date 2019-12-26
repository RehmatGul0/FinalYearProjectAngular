import { AddGetDomainComponent } from './admin-view-components/add-get-domain/add-get-domain.component';
import { AddGetAlgorithmComponent } from './admin-view-components/add-get-algorithm/add-get-algorithm.component';
import { AddQuestionComponent } from './admin-view-components/add-question/add-question.component';
import { AddModelInfoComponent } from './admin-view-components/add-model-info/add-model-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin-view-components/login/login.component';
import { HomeComponent } from './admin-view-components/home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/signin',
    pathMatch: 'full',
  },
  {
    path: 'admin/signin',
    component: LoginComponent
  },
  {
    path: 'admin/home',
    component: HomeComponent
  },
  {
    path: 'admin/addModelInfo',
    component: AddModelInfoComponent
  },
  {
    path: 'admin/addQuestion',
    component: AddQuestionComponent
  },
  {
    path: 'admin/algorithm',
    component: AddGetAlgorithmComponent
  },
  {
    path: 'admin/domain',
    component: AddGetDomainComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }