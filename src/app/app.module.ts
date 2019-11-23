import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {RoutingModule} from './routing/app.routing';
import { UserModule } from './user-module/user-module.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    UserModule,
    RoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
