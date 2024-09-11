import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form!: FormGroup;
  isLoading = false; // Flag para controle do loader

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  createPayloadLogin() {
    const nome = this.getValueControl(this.form, 'nome');
    const email = this.getValueControl(this.form, 'email');
    const password = this.getValueControl(this.form, 'password');
    return { nome, email, password };
  }

  signup() {
    if (this.isValidForm()) {
      this.isLoading = true;

      this.authService.createUser(this.createPayloadLogin())
        .subscribe({
          next: (res: any) => {
            this.isLoading = false;
            this.router.navigate(['login']); // Navegar para a página inicial
          },
          error: (err: any) => {
            this.isLoading = false;
            this.snackBar.open('Erro ao cadastrar. Por favor, tente novamente.', 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        });
    }
  }

  isValidForm() {
    return this.form.valid;
  }

  back() {
    this.router.navigate(['login']);
  }
}
