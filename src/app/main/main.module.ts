import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TermsComponent } from "./terms/terms.component";

@NgModule({
  declarations: [
    MainComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TermsComponent
]
})
export class MainModule { }
