import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './user-view-components/home/home.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { LoginComponent } from './user-view-components/login/login.component';
import { RegisterComponent } from './user-view-components/register/register.component';


const routes: Routes = [
      {
        path: '',
        redirectTo: 'user/signin',
        pathMatch: 'full',
      },
      {
        path: 'user/signin',
        component: LoginComponent
      },
      {
        path: 'user/signup',
        component: RegisterComponent
      }
      ,
      {
        path: 'user/uploadData',
        component:UploadDataComponent
      }
      ,
      {
        path: 'user/home',
        component:HomeComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }