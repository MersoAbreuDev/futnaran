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

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog   // Injetando MatDialog no construtor
  ) {}

  ngOnInit() {
    console.log('Jogadores', this.jogadores);
    this.loadPlayers();
  }

  loadPlayers() {
    this.authService.getAllPlayers().subscribe((res: any) => {
      console.log('Jogadores', res);
      this.jogadores = res;
    });
  }

  openImageDialog(imageUrl: string) {  // Método para abrir o diálogo
    this.dialog.open(ImageDialogComponent, {
      data: { image: imageUrl },
      width: '420px', 
      height:'420px' // Configura o tamanho do diálogo
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
