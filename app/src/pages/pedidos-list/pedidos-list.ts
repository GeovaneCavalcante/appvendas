import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-pedidos-list',
  templateUrl: 'pedidos-list.html',
})
export class PedidosListPage {

  pedidos: any[] = []
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidosProvider: PedidosProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.storage.get('token').then((token) =>{
      this.getPedidos(token)
    })
  }


  getPedidos(token){
    this.presentLoading()
    this.pedidosProvider.getPedidos(token).then(data =>{
      this.pedidos = data
      console.log(data)
      this.loading.dismiss();
    })
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

}
