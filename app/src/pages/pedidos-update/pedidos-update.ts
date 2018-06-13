import { PedidosListPage } from './../pedidos-list/pedidos-list';
import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { ItemsProvider } from './../../providers/items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ProductAddOrderPage } from '../product-add-order/product-add-order';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PedidosUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-update',
  templateUrl: 'pedidos-update.html',
})
export class PedidosUpdatePage {

  loading: any;
  clientes: any[] = []
  pedido: any;
  
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
      this.pedido = this.navParams.get('pedido')
      console.log()
      for(let a=0; a< this.pedido['items'].length; a++){
        let dado ={}
        if(this.pedido['items'][a]['img'].substring(0,4) != "http"){
          dado = {
            "valor": this.pedido['items'][a]['price'],
            "id": this.pedido['items'][a]['product'],
            "foto": "http://geovanedevelop.pythonanywhere.com/media/" + this.pedido['items'][a]['img'],
            "quantidade": this.pedido['items'][a]['quantity'],
            "nome": this.pedido['items'][a]['product_name'],
          }
         }else{
          dado = {
            "valor": this.pedido['items'][a]['price'],
            "id": this.pedido['items'][a]['product'],
            "foto": this.pedido['items'][a]['img'],
            "quantidade": this.pedido['items'][a]['quantity'],
            "nome": this.pedido['items'][a]['product_name'],
          }
         }
    
         this.itemsService.addItem(dado);
      }
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
        "total_order": values['total_order'],
        "id": values['id']
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
        this.updatePedido(data, dados_json);
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
  
  updatePedido(token, dados){
    console.log(dados)
    
    this.presentLoading()
    this.pedidosProvider.updatePedido(token,dados).then(data =>{
      this.loading.dismiss();
      this.navCtrl.pop()
      this.navCtrl.push(PedidosListPage)
    })
    
  }

}
