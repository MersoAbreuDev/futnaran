import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  jogadorForm!: FormGroup;
  isLoading = false;
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.jogadorForm = this.fb.group({
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0)]],
      posicao: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      endereco: ['', [Validators.required]],
      imagem: [null, [Validators.required]]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jogadorForm.patchValue({
        imagem: file
      });
      this.imageError = null;
    } else {
      this.imageError = 'Erro ao selecionar imagem.';
    }
  }

  onSubmit() {
    if (this.jogadorForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    Object.keys(this.jogadorForm.value).forEach(key => {
      formData.append(key, this.jogadorForm.value[key]);
    });

    // Aqui você pode fazer o upload dos dados e da imagem
    // this.saveJogador(formData)
    //   .pipe(
    //     tap(() => {
    //       this.isLoading = false;
    //       this.snackBar.open('Jogador cadastrado com sucesso!', 'Fechar', {
    //         duration: 3000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center',
    //       });
    //       this.router.navigate(['home']);
    //     }),
    //     catchError(error => {
    //       this.isLoading = false;
    //       this.snackBar.open('Erro ao cadastrar jogador. Tente novamente.', 'Fechar', {
    //         duration: 5000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center',
    //       });
    //       return of();
    //     })
    //   )
    //   .subscribe();
  }

}
