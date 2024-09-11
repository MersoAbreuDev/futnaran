import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-term1',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './term1.component.html',
  styleUrl: './term1.component.scss'
})
export class Term1Component {
  readonly dialog = inject(MatDialog);
  constructor() { }


  checkTerm(){
    this.dialog.closeAll();
  }
}
