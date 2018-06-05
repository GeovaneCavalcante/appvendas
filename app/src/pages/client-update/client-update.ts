import { ClientListPage } from './../client-list/client-list';
import { CidadeEstadoProvider } from './../../providers/cidade-estado/cidade-estado';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ClientUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-update',
  templateUrl: 'client-update.html',
})
export class ClientUpdatePage {
  
  cliente: any
  loading: any;
  cidades : any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cidadeEstado: CidadeEstadoProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private clientesProvider: ClientesProvider,
    public storage: Storage,)
  {

    this.cliente = this.navParams.get('cliente')  
    console.log(this.cliente)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientUpdatePage');
  }
  validate(valido, values){

    if(!valido){
      this.presentToast(values)
    }{
      if(values['UFCliente'] != ""){
        values['estado'] = values['UFCliente'].split("|")[1]
      }else{
        values['estado'] = ""
      }
      this.presentLoading()
      this.storage.get("token").then(data => {
        values['id'] = this.cliente['id']
        this.updateClientes(values, data)
      });
    }
  }

  updateClientes(values, token){

    this.clientesProvider.updateCliente(values, token, this.cliente['id']).then(data =>{

      this.loading.dismiss();
      this.navCtrl.pop()
      this.navCtrl.push(ClientListPage)
    })
  }

  presentToast(values) {
    if(values['name'] == ""){

      let toast = this.toastCtrl.create({
        message: "Campo Nome é obrigatório",
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();

    }
    if(values['cpf'] == ""){

      let toast = this.toastCtrl.create({
        message: "Campo CPF é obrigatório",
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();

    }
    if(values['telefone'] == ""){

      let toast = this.toastCtrl.create({
        message: "Campo Telefone é obrigatório",
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();

    }
   
  }


  getCidades(uf){
    uf = uf.split("|")[0];
    this.presentLoading()
    this.cidadeEstado.getCidades(uf)
    .then(data =>{
      this.cidades = data;
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
