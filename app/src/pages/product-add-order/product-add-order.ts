import { ProdutosProvider } from './../../providers/produtos/produtos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: "page-product-add-order",
  templateUrl: "product-add-order.html"
})
export class ProductAddOrderPage {

  searchControl: FormControl;
  searchTerm: string = "";
  products: any;
 
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productsService: ProdutosProvider,
    public itemsService: ItemsProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
  ) {
    this.searchControl = new FormControl();
    this.loading = true;
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    this.presentLoading()
    this.storage.get('token').then((token) =>{
      this.listProducts(token)
    })
  }

  listProducts(token){
    this.productsService.getProdutos(token).then(result =>{
      this.products = result
      this.loading.dismiss()
    })
  }

  filterProducts(ev:any){
    if(this.searchTerm == ''){
      this.storage.get('token').then((token) =>{
        this.listProducts(token)
      })
    }
    
    let val = ev.target.value;

    if(val && val.trim() != ''){
      this.products = this.products.filter((item)=> {
        return item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  closeModal(id, value, quantidade, foto, nome){
    let dados = {
      'id': id,
      'valor': value,
      'quantidade': quantidade,
      'foto': foto,
      'nome': nome
    }    
    this.itemsService.addItem(dados)
    this.navCtrl.pop();
  }

  closeModal2(item){
    this.navCtrl.pop();
  }



}
