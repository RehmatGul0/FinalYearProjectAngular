import { HomeComponent } from './../view-components/home/home.component';
import { UploadDataComponent } from './../view-components/upload-data/upload-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../view-components/login/login.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
  {
    path: 'user/login',
    component: LoginComponent
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
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
