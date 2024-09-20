import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { IEndereco } from '../../../interfaces/IEndereco';
import { AuthService } from '../../../services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { IMaskModule } from 'angular-imask';
import { ViaCepService } from '../../../services/via-cep/via-cep.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    IMaskModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  jogadorForm!: FormGroup;
  isLoading = false;
  imagePreview: string | ArrayBuffer | null = null;
  showCamera = false;
  defaultImage: string = '/assets/img/default_avatar.png';  // Imagem padrão
  private stream: MediaStream | null = null;
  userId:string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private storageService: StorageService,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit() {
    this.initForms();
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser) {
      this.userId = currentUser.uid;
      this.authService.findById(this.userId).subscribe((res: any) => {
        const user = res.jogador;
        console.log('Usuário', user);
        this.populateForm(user);
      });
    } else {
      console.log('Nenhum usuário logado');
    }

    this.jogadorForm.get('cep')?.valueChanges.subscribe(value => {
      if (value.length === 9) {  // Quando o CEP está completo
        this.loadAddressByCep(value);
      }
    });
  }

  loadAddressByCep(cep: string): void {
    const cleanCep = cep.replace(/\D/g, '');  // Remover caracteres não numéricos
    this.viaCepService.getAddressByCep(cleanCep).subscribe(
      (data) => {
        if (data && !data.erro) {
          this.jogadorForm.patchValue({
            cidade: `${data.localidade +" - "+ data.uf}`,
          });
        } else {
          alert('CEP não encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao buscar o CEP: ', error);
      }
    );
  }

  initForms() {
    this.jogadorForm = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      idade: ['', [Validators.required, Validators.min(0)]],
      posicao: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      imagem: [null] 
    });
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
            
            this.isLoading = true;
            this.storageService.uploadImage(file, this.userId).subscribe({
                next: (downloadURL) => {
                    this.isLoading = false;
                    this.jogadorForm.patchValue({ imagem: downloadURL });
                    this.snackBar.open('Imagem enviada com sucesso!', 'Fechar', {
                        duration: 3000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                    });
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error('Erro ao enviar a imagem:', error);
                    this.snackBar.open('Erro ao enviar a imagem!', 'Fechar', {
                        duration: 3000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                    });
                }
            });
        } else {
            alert('Por favor, selecione uma imagem.');
        }
        this.showCamera = false;
    }
}

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
        this.videoElement.nativeElement.play();
        this.showCamera = true;
      }
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
    }
  }

  captureImage() {
    const video = this.videoElement.nativeElement as HTMLVideoElement;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      this.imagePreview = imageData;
      this.jogadorForm.patchValue({ imagem: this.dataURLtoFile(imageData, 'image.png') });
      this.stopCamera();
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.showCamera = false;
  }

  dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  populateForm(data: any) {
    this.jogadorForm.patchValue({
      nome: data.nome,
      telefone: data.telefone,
      idade: data.idade,
      posicao: data.posicao,
      altura: data.altura,
      peso: data.peso,
      cep: data.endereco.cep,
      logradouro: data.endereco.logradouro,
      numero: data.endereco.numero,
      bairro: data.endereco.bairro,
      cidade: data.endereco.cidade,
      imagem: data.imagem 
    });
    
    if (data.imagem) {
      this.imagePreview = data.imagem;
    } else {
      this.imagePreview = this.defaultImage;  // Definindo imagem padrão
    }
  }

  createPayloadPerfil() {
    const endereco: IEndereco = {
      logradouro: this.getValueControl(this.jogadorForm, 'logradouro'),
      cidade: this.getValueControl(this.jogadorForm, 'cidade'),
      cep: this.getValueControl(this.jogadorForm, 'cep'),
      bairro: this.getValueControl(this.jogadorForm, 'bairro'),
      numero: this.getValueControl(this.jogadorForm, 'numero'),
    };
    const payload  = {
      nome: this.getValueControl(this.jogadorForm, 'nome'),
      telefone: this.getValueControl(this.jogadorForm, 'telefone'),
      imagem: this.getValueControl(this.jogadorForm, 'imagem'),  // Já será a URL da imagem no Storage
      endereco: endereco,
      altura: this.getValueControl(this.jogadorForm, 'altura'),
      peso: this.getValueControl(this.jogadorForm, 'peso'),
      posicao: this.getValueControl(this.jogadorForm, 'posicao'),
      idade: this.getValueControl(this.jogadorForm, 'idade'),
      id: this.userId
    };
  
    return payload;
  }

  onSubmit() {
    if (this.jogadorForm.invalid) {
      return;
    }
  
    this.isLoading = true;
  
    const payload = this.createPayloadPerfil();  
   const path = this.saveToFirestore(payload).then(() => {
      this.isLoading = false;
      this.authService.updateUser(this.userId, payload).subscribe((res:any) => {
        console.log('Dados salvos com sucesso:', res);
      });
      this.snackBar.open('Jogador cadastrado com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

      this.router.navigate(['main']);
    }).catch(error => {
      console.error('Erro ao salvar dados:', error);
      this.isLoading = false;
    });
  }

  saveToFirestore(payload: any): Promise<void> {
    return this.storageService.saveImageData(this.userId, payload.imagem);
  }
  
  goBack() {
    this.router.navigate(['/main']);  // Defina a rota de "voltar"
  }

  navigateToHome() {
    this.router.navigate(['/main']);  // Navegar para a página inicial
  }

  navigateToProfile() {
    this.router.navigate(['/main/profile']);  // Navegar para a página de perfil
  }
}
