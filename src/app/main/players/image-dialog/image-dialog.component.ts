import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  template: `
    <div class="dialog-content">
      <img [src]="data.image" alt="Imagem ampliada" class="large-image">
    </div>
  `,
  styles: [`
    .large-image {
      width: 100%;
      height: auto;
    }
    .dialog-content {
      display: flex;
      justify-content: center;
    }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}