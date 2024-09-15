import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TermsComponent } from "./terms/terms.component";
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { JogosComponent } from './jogos/jogos.component';
import { TimesComponent } from './times/times.component';
@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TermsComponent,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    JogosComponent,
    TimesComponent
]
})
export class MainModule { }
