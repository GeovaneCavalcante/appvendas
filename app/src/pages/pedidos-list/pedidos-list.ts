import { PedidosUpdatePage } from './../pedidos-update/pedidos-update';
import { PedidosCreatePage } from './../pedidos-create/pedidos-create';
import { FormControl } from '@angular/forms';
import { PedidosDetailPage } from './../pedidos-detail/pedidos-detail';
import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ClientCreatePage } from '../client-create/client-create';


@IonicPage()
@Component({
  selector: 'page-pedidos-list',
  templateUrl: 'pedidos-list.html',
})
export class PedidosListPage {

  searchControl: FormControl;
  searchTerm: string = "";
  pedidos: any[] = []
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidosProvider: PedidosProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
   ) {

  }

  ionViewDidLoad() {
    this.storage.get('token').then((token) =>{
      this.getPedidos(token)
    })
  }

  alertDelete(pedido) {
    let prompt = this.alertCtrl.create({
      title: 'Atenção!',
      message: "Tem certeza que deseja remover o pedido?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Deletar',
          handler: data => {
            this.storage.get('token').then((token) =>{
              this.deletePedido(token, pedido)
            })
          }
        }
      ]
    });
    prompt.present();
  }

  deletePedido(token, pedido){
    this.presentLoading()
    this.pedidos = this.pedidos.filter(item => item['id'] !== pedido['id'])
    this.pedidosProvider.deletePedido(token, pedido['id']).then(data =>{
      this.loading.dismiss();
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

  presentActionSheet(pedido) {

    let actionSheet = this.actionSheetCtrl.create({
      title: "Escolha uma opção",
      buttons: [
        {
          text: "Visualizar",
          icon: "browsers",
          role: "ver",
          handler: () => {
            this.navCtrl.push(PedidosDetailPage, { pedido });
          }
        },
       
        {
          text: "Editar",
          icon: "brush",
          handler: () => {
            this.navCtrl.pop()
            this.navCtrl.push(PedidosUpdatePage, { pedido });
           
          }
        },
        {
          text: "Deletar",
          icon: "md-trash",
          handler: () => {
           this.alertDelete(pedido)
          }
        },
        {
          text: "Cancelar",
          icon: "md-log-out",
          role: "cancel",
          handler: () => {
            console.log("Cancelado");
          }
        }
      ]
    });

    actionSheet.present();
  }

  filterOrders(ev: any) {
    if (this.searchTerm == "") {
      this.storage.get("token").then(data => {
        this.getPedidos(data);
      });
    }

    let val = ev.target.value;

    if (val && val.trim() != "") {
      this.pedidos = this.pedidos.filter(item => {
        return item.client_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  pedidosCreate(){
    this.navCtrl.pop()
    this.navCtrl.push(PedidosCreatePage)
  }

}
