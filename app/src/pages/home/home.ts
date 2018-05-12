import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

import { ProductListPage } from '../product-list/product-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public storage: Storage,
    public alertCtrl: AlertController
  ) 
  {
    this.menuCtrl.enable(true); 
  }

  pageProdutos(){
    this.navCtrl.push(ProductListPage)
  }

  logout(){
    this.storage.remove('token').then(val => val)
    this.storage.remove('user').then(val => val)
    this.navCtrl.setRoot(LoginPage)
  }

  exit() {
    let prompt = this.alertCtrl.create({
      title: 'Atenção!',
      message: "Deseja realmente sair do aplicativo?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sair',
          handler: data => {
            this.logout()
          }
        }
      ]
    });
    prompt.present();
  }

}
