import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [MatCardModule, MatIconButton, MatButtonModule, CommonModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.scss',
  exportAs: 'jogos'
})
export class JogosComponent {
  @ViewChild('cardsContainer', { static: true }) cardsContainer: ElementRef | undefined;

  // Lista de cartões (você pode adaptar essa lista com dados dinâmicos)
  cards = [
    { title: 'Card 1', description: 'Descrição do card 1' },
    { title: 'Card 2', description: 'Descrição do card 2' },
    { title: 'Card 3', description: 'Descrição do card 3' },
    { title: 'Card 4', description: 'Descrição do card 4' },
    { title: 'Card 5', description: 'Descrição do card 5' }
  ];

  scrollLeft() {
    const container = this.cardsContainer?.nativeElement;
    container.scrollLeft -= container.offsetWidth; // Rola o container para a esquerda
  }

  scrollRight() {
    const container = this.cardsContainer?.nativeElement;
    container.scrollLeft += container.offsetWidth; // Rola o container para a direita
  }
}
