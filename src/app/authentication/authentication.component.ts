import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: AuthService,
              private cdRef: ChangeDetectorRef,
            ){}



  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      email:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  };

  createPayloadLogin(
    email = this.getValueControl(this.form, 'email'),
    password = this.getValueControl(this.form, 'password'))
  {
    const payload ={email, password}

    return payload;
  }


  submit() {
    if (this.isValidForm()) {
      const { email, password } = this.form.value;
      this.cdRef.detectChanges();

      this.loginService.login({ email, password })
        .subscribe({
          next: ({ userCredential }) => {
            if (userCredential) {
              this.router.navigate(['main']).then(() => {
                this.cdRef.detectChanges();
              });
            }
          },
          error: (error: any) => {
            console.error('Erro de autenticação:', error.code, error.message);
            this.cdRef.detectChanges();
          }
        });
    }
  }



  isValidForm(){
    return this.form.valid;
  }

  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }


}
