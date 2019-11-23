import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './user-view-components/home/home.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { LoginComponent } from './user-view-components/login/login.component';


const routes: Routes = [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent
      }
      ,
      {
        path: 'uploadData',
        component:UploadDataComponent
      }
      ,
      {
        path: 'home',
        component:HomeComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }