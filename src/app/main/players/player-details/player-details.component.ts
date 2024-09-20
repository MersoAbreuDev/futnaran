import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent implements OnInit {
  playerId: any;
  player:any;
constructor(private router: Router, private route: ActivatedRoute,
 private authService: AuthService
) { }


ngOnInit() {
  this.playerId = this.route.snapshot.paramMap.get('id')!;
  console.log('Player ID:', this.playerId);

  this.authService.findById(this.playerId).subscribe((res:any) => {
    this.player = res.jogador;
  });
}


  goBack() {
    this.router.navigate(['main/players']); 
  }

  navigateToHome() {
    this.router.navigate(['/main']); 
  }

  navigateToProfile() {
    this.router.navigate(['/main/profile']);  
  }




}
