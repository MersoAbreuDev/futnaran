import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayersComponent } from './players/players.component';
import { TermsComponent } from './terms/terms.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';

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
  },
  {
    path: 'players-details/:id',
    component:PlayerDetailsComponent
  },
    {
    path:'terms',
    component:TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
