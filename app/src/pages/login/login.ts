import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GenericoProvider } from '../../providers/generico/generico';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  email: any
  password: any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public genericoProvider: GenericoProvider,
    public formBuilder: FormBuilder) 
  {
    let emailRegex = /^[a-z0-9!#$%&'+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-][a-z0-9])?(\.[a-z0-9]([a-z0-9-][a-z0-9])?)$/i;

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
   
  }

  singIn(){

    let data = {
      email: this.email,
      password: this.password
    }

    this.genericoProvider.login(data)
    .then(data =>{
      
    })
    .catch(error =>{

    })

  }

}
