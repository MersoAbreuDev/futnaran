import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-term3',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './term3.component.html',
  styleUrl: './term3.component.scss'
})
export class Term3Component {
  readonly dialog = inject(MatDialog);
  constructor() { }


  checkTerm(){
    this.dialog.closeAll();
  }
}
