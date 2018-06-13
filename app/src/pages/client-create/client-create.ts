import { ClientListPage } from './../client-list/client-list';
import { ClientDetailPage } from './../client-detail/client-detail';
import { ClientesProvider } from './../../providers/clientes/clientes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CidadeEstadoProvider } from '../../providers/cidade-estado/cidade-estado';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-client-create',
  templateUrl: 'client-create.html',
})
export class ClientCreatePage {

  disa: boolean = true;
  cidades : any;
  loading: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cidadeEstado: CidadeEstadoProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private clientesProvider: ClientesProvider,
    public storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientCreatePage');
  }


  getCidades(uf){
    uf = uf.split("|")[0];
    this.presentLoading()
    this.cidadeEstado.getCidades(uf)
    .then(data =>{
      this.cidades = data;
      this.disa = false;
      this.loading.dismiss();
    })
  }

  validate(valido, values){

    if(!valido){
      this.presentToast(values)
    }else{
      if(values['UFCliente'] != ""){
        values['estado'] = values['UFCliente'].split("|")[1]
      }else{
        values['estado'] = ""
      }
      this.presentLoading()
      this.storage.get("token").then(data => {
        this.createClientes(values, data)
      });
    }
  }


  createClientes(values, token){
    this.clientesProvider.createCliente(values, token).then(data =>{
      console.log(data)
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


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }


}
