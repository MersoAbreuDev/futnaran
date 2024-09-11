import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-term4',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './term4.component.html',
  styleUrl: './term4.component.scss'
})
export class Term4Component {
  readonly dialog = inject(MatDialog);
  constructor() { }


  checkTerm(){
    this.dialog.closeAll();
  }
}
