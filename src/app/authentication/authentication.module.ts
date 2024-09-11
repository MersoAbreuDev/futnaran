import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add these imports

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // import the module
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ],

})
export class AuthenticationModule { }
