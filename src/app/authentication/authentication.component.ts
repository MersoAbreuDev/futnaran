import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router){}



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


  login(){
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
