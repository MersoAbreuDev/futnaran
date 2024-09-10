import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add these imports

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
     SignupComponent,
     ForgetPasswordComponent
    ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

  ],

})
export class AuthenticationModule { }
