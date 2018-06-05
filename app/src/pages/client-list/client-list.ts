import { ClientesProvider } from './../../providers/clientes/clientes';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ClientDetailPage } from '../client-detail/client-detail';
import { ClientCreatePage } from '../client-create/client-create';
import { ClientUpdatePage } from '../client-update/client-update';


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
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
  }


  presentActionSheet(cliente) {

    let actionSheet = this.actionSheetCtrl.create({
      title: "Escolha uma opção",
      buttons: [
        {
          text: "Visualizar",
          icon: "browsers",
          role: "ver",
          handler: () => {
            this.navCtrl.push(ClientDetailPage, { cliente });
          }
        },
       
        {
          text: "Editar",
          icon: "brush",
          handler: () => {
            this.navCtrl.pop()
            this.navCtrl.push(ClientUpdatePage, { cliente });
          }
        },
        {
          text: "Detelar",
          icon: "md-trash",
          handler: () => {
            this.alertDelete(cliente)
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

  alertDelete(cliente) {
    let prompt = this.alertCtrl.create({
      title: 'Atenção!',
      message: "Tem certeza que deseja remover o cliente " + cliente['name'] +  " ?",
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
            this.clienteDelete(cliente)
          }
        }
      ]
    });
    prompt.present();
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
    this.navCtrl.pop()
    this.navCtrl.push(ClientCreatePage)
   
  }

  clienteDelete(cliente){
    this.presentLoading()

    this.clientes = this.clientes.filter(item => item['id'] !== cliente['id'])

    this.storage.get("token").then(data => {
     this.clientesProvider.deleteCliente(cliente['id'], data).then(data =>{
      this.loading.dismiss();
      })
    });
   
  }

}
