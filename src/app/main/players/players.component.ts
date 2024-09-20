import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IJogador } from '../../../interfaces/IJogador';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-players',
  standalone: true,
  imports: [ 
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatButtonModule    
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit {
  jogadores: IJogador[] = [];
  defaultImage: string = '/assets/img/messi_pixar.png';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog   // Injetando MatDialog no construtor
  ) {}

  ngOnInit() {
    console.log('Jogadores', this.jogadores);
    this.loadPlayers();
  }

  getTruncatedName(name: string): string {
    return name.length > 20 ? name.slice(0, 15) + '...' : name;
  }

  loadPlayers() {
    this.authService.getAllPlayers().subscribe((res: any) => {
      console.log('Jogadores', res);
      this.jogadores = res;
    });
  }

  playerDetails(id: string) {
    this.router.navigate(['/main/players-details', id]); 
  }

  openImageDialog(imageUrl: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { image: imageUrl || this.defaultImage }, // Usar imagem padrão se necessário
      width: '420px',
      height: '420px'
    });
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
