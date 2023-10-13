import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {CoreModule} from "../../core/core.module";
import { LogoutComponent } from './logout.component';
import {LoginComponent} from "./login/login.component";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule
  ]
})
export class LoginModule { }
