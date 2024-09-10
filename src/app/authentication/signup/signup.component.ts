import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router){}



  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      nome:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  };

  createPayloadLogin(
    nome = this.getValueControl(this.form, 'nome'),
    email = this.getValueControl(this.form, 'email'),
    password = this.getValueControl(this.form, 'password'))
  {
    const payload ={nome, email, password}

    return payload;
  }


  signup(){
    if(this.isValidForm()){
      const {email} = this.createPayloadLogin();
      console.log(this.createPayloadLogin())
      // this.loginService.login(this.createPayloadLogin())
      // .subscribe((res:any)=>{
      //   let {token} = res;
      //   this.navigateURL('home');
      // })
    }else{
    //  this.messages = [{ severity: 'error', summary: 'Login ou senha incorretos'}];
    }
  }

  isValidForm(){
    return this.form.valid;
  }

  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }


}
