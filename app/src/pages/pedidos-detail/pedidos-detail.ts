import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PedidosDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-detail',
  templateUrl: 'pedidos-detail.html',
})
export class PedidosDetailPage {

  pedido: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pedido = this.navParams.get('pedido')
    this.formatNome()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosDetailPage');
  }

  formatNome(){
    for(let a=0; this.pedido.produtos.length>a; a++){
      this.pedido['produtos'][a]['nome_curto'] = this.doTruncarStr(this.pedido['produtos'][a]['nome'], 20)
    }
  }
  doTruncarStr(str, size){
    if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
        return str;
    }
     
    var shortText = str;
    if(str.length >= size+3){
        shortText = str.substring(0, size).concat('...');
    }
    return shortText;
  }  

}
