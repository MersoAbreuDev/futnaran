import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TermosService } from '../../../../services/termos/termos.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-term4',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './term4.component.html',
  styleUrl: './term4.component.scss'
})
export class Term4Component {
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
      term: "term4",
      aceito: true,
      userId: this.userId
    };
    this.termService.acceptTerm(payload).subscribe((res: any) => {
      console.log('Termo aceito', res);
    });
    this.dialog.closeAll();
  }
}
