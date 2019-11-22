import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


import {RoutingModule} from './routing/app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './view-components/navbar/navbar.component';
import { LoginComponent } from './view-components/login/login.component';
import { UploadDataComponent } from './view-components/upload-data/upload-data.component';
import { HomeComponent } from './view-components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UploadDataComponent,
    HomeComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
