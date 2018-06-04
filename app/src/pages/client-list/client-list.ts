import { ClientesProvider } from './../../providers/clientes/clientes';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ClientDetailPage } from '../client-detail/client-detail';
import { ClientCreatePage } from '../client-create/client-create';


@IonicPage()
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {

  searchControl: FormControl;
  searchTerm: string = "";
  clientes: any[] = [];
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private clientesProvider: ClientesProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.storage.get("token").then(data => {
      this.getClientes(data);
    });
  }

  onCancel(){
    this.storage.get("token").then(data => {
      this.getClientes(data);
    });
  }
  
  filterOrders(ev: any) {
    if (this.searchTerm == "") {
      this.storage.get("token").then(data => {
        this.getClientes(data);
      });
    }

    let val = ev.target.value;

    if (val && val.trim() != "") {
      this.clientes = this.clientes.filter(item => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  getClientes(token){
    this.presentLoading()
    this.clientesProvider.getClientes(token).then(data =>{
      this.clientes = data
      this.loading.dismiss();
    })
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

  clienteDetail(cliente){
    this.navCtrl.push(ClientDetailPage, {cliente})
  }

  clienteCreate(){
    this.navCtrl.push(ClientCreatePage)
  }
  
}
