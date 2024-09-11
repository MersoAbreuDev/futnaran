import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-term2',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './term2.component.html',
  styleUrl: './term2.component.scss'
})
export class Term2Component {
  readonly dialog = inject(MatDialog);
  constructor() { }


  checkTerm(){
    this.dialog.closeAll();
  }
}
