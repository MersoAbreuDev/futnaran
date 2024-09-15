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
  isActive = false;
  img:any="";
  userId: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      this.userId = currentUser.uid;
      this.authService.findById(this.userId).subscribe((res:any) => {
        this.img = res.jogador;
        console.log('Usuário', this.img);

      });
   }
  }


  toggleActive() {
    this.isActive = !this.isActive;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goPlayers() {
    this.router.navigate(['main/players']);
  }

  goAdminSession(){
    this.router.navigate(['main/admin-session']);
  }
  logoff() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 500);
  }

  goBack() {
    this.router.navigate(['/main']);  // Defina a rota de "voltar"
  }

  navigateToHome() {
    this.router.navigate(['/main']);  // Navegar para a página inicial
  }

  navigateToProfile() {
    this.router.navigate(['/main/profile']);  // Navegar para a página de perfil
  }
}
