import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDatailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-datail',
  templateUrl: 'product-datail.html',
})
export class ProductDatailPage {

  produto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.produto =  this.navParams.get('produto')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDatailPage');
  }

}
