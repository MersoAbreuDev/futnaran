import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  isSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logoff() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 500);
  }
}
