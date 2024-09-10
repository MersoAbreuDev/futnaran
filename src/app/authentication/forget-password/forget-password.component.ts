import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router){}

  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      email:['',[Validators.required]],
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  };

  createPayloadLogin(
    email = this.getValueControl(this.form, 'email'),
  )
  {
    const payload ={email }

    return payload;
  }


  onSubmit(){
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
