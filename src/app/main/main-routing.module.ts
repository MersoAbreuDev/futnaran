import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path:'',
    component: MainComponent,
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'players',
    component:PlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
