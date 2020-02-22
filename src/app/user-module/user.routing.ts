import { Routes } from '@angular/router';

import { HomeComponent } from './user-view-components/home/home.component';
import { UploadDataComponent } from './user-view-components/upload-data/upload-data.component';
import { LoginComponent } from './user-view-components/login/login.component';
import { RegisterComponent } from './user-view-components/register/register.component';


export const userRoutes: Routes = [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
      },
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: RegisterComponent
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
