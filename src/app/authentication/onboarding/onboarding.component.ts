import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {

  constructor(
    private router:Router
  ) { }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
