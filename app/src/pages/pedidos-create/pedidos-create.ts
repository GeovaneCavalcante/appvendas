import { PedidosListPage } from './../pedidos-list/pedidos-list';
import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { ItemsProvider } from './../../providers/items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ProductAddOrderPage } from '../product-add-order/product-add-order';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PedidosCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-create',
  templateUrl: 'pedidos-create.html',
})
export class PedidosCreatePage {
  
  loading: any;
  clientes: any[] = []
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemsService: ItemsProvider,
    private clientesProvider: ClientesProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public pedidosProvider: PedidosProvider,
    public toastCtrl: ToastController,) {
      this.itemsService.zera()
  }

  ionViewDidLoad() {
    this.storage.get("token").then(data => {
      this.getClientes(data);
    });
  }

  remove(item){
    this.itemsService.remove(item)
  }
  
  produtosAdd(){
    this.navCtrl.push(ProductAddOrderPage)
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

  getClientes(token){
    this.presentLoading()
    this.clientesProvider.getClientes(token).then(data =>{
      this.clientes = data
      this.loading.dismiss();
    })
  }

  validate(valido, values){
    if(!valido){
      this.presentToast("cliente")

    }else if(this.itemsService.items.length == 0){
      this.presentToast("itens")
    }else{

      let items  = []
      let dados_json = {
        "client": values['client'],
        "obs": values['obs'],
        "status": values['status'],
        "total_order": values['total_order']
      }

      for(let a=0; this.itemsService.items.length > a; a++){
        let dados = {
          "product": this.itemsService.items[a]['id'],
          "quantity": this.itemsService.items[a]['quantidade'],
          "price": this.itemsService.items[a]['valor']
        }
        items[a] = dados
      }
    
      dados_json['items']  = items
      console.log(dados_json)
      
      this.storage.get("token").then(data => {
        this.createPedido(data, dados_json);
      });
    }
  }

  presentToast(values) {
    if(values == "cliente"){
      let toast = this.toastCtrl.create({
        message: "Campo Cliente é obrigatório",
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: "Coloque pelo menos 1 produto no pedido",
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();
    }
   
  }
  
  createPedido(token, dados){
    this.presentLoading()
    this.pedidosProvider.createPedido(token,dados).then(data =>{
      this.loading.dismiss();
      this.navCtrl.pop()
      this.navCtrl.push(PedidosListPage)
    })
  }
  
}

