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
    console.log(this.pedido)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosDetailPage');
  }
  

  formatNome(){
    let preco =  0
    for(let a=0; this.pedido.items.length>a; a++){
      
      preco += Math.floor(this.pedido['items'][a]['price'])
      if(this.pedido['items'][a]['img'].substring(0,4) != "http"){
        this.pedido['items'][a]['img'] = "https://geovanedevelop.pythonanywhere.com/media/" + this.pedido['items'][a]['img']
      }
      this.pedido['items'][a]['nome_curto'] = this.doTruncarStr(this.pedido['items'][a]['product_name'], 20)
    }
    this.pedido['total_compra'] = preco
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
