import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-times',
  standalone: true,
  imports: [MatCardModule, MatIconButton, MatButtonModule, CommonModule],
  templateUrl: './times.component.html',
  styleUrl: './times.component.scss'
})
export class TimesComponent {

  images: { path: string; description: string; }[] = [
    {
      'path': 'assets/icones/brasil.png',
      'description': 'Brasil'
    },
    {
      'path': 'assets/icones/argentina.png',
      'description': 'Argentina'
    },
    {
      'path': 'assets/icones/espanha.png',
      'description': 'Espanha'
    },
    {
      'path': 'assets/icones/alemanha.png',
      'description': 'Alemanha'
    },
    {
      'path': 'assets/icones/belgica.png',
      'description': 'Belgica'
    },
    {
      'path': 'assets/icones/camaroes.png',
      'description': 'Camarões'
    },
    {
      'path': 'assets/icones/croacia.png',
      'description': 'Croácia'
    },
    {
      'path': 'assets/icones/franca.png',
      'description': 'França'
    },
    {
      'path': 'assets/icones/paises-baixos.png',
      'description': 'Paises Baixos'
    },
    {
      'path': 'assets/icones/portugal.png',
      'description': 'Portugal'
    },
    {
      'path': 'assets/icones/senegal.png',
      'description': 'Senegal'
    }
  ];

  ngOnInit() {
    this.images.forEach(image => {
      console.log('Image path:', image);
    });
  }
}
