import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../enviroments/enviroment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  exports: [],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
