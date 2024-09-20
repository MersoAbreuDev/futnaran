import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../services/auth/auth.service';
import { TermosService } from '../../../../services/termos/termos.service';

@Component({
  selector: 'app-term2',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './term2.component.html',
  styleUrl: './term2.component.scss'
})
export class Term2Component {
  readonly dialog = inject(MatDialog);
  userId: string = '';
  constructor(
    private authService: AuthService,
    private termService: TermosService,
  ) { 
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.userId = currentUser.uid;
      console.log('Usuário', this.userId);
   }

  }


  checkTerm(){
    const payload = {
      term: "term2",
      aceito: true,
      userId: this.userId
    };
    this.termService.acceptTerm(payload).subscribe((res: any) => {
      console.log('Termo aceito', res);
    });
    this.dialog.closeAll();
  }
}
