import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./authentication/onboarding/onboarding.module').then( m => m.OnboardingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
