import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Term1Component } from './term1/term1.component';
import { Term2Component } from './term2/term2.component';
import { Term3Component } from './term3/term3.component';
import { Term4Component } from './term4/term4.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {

  readonly animal = signal('');
  readonly dialog = inject(MatDialog);

  term1(): void {
    const dialogRef = this.dialog.open(Term1Component, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  term2(): void {
    const dialogRef = this.dialog.open(Term2Component, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  term3(): void {
    const dialogRef = this.dialog.open(Term3Component, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  term4(): void {
    const dialogRef = this.dialog.open(Term4Component, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
