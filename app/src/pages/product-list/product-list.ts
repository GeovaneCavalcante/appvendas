import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { Storage } from '@ionic/storage';
import { ProductDatailPage } from '../product-datail/product-datail';
/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  produtos: any[] = [];
  categorias: any
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private produtosProvider: ProdutosProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.presentLoading()
    console.log('ionViewDidLoad ProductListPage');
    this.storage.get('token').then((token) =>{
      this.getProduto(token)
      this.getCategoria(token)
    })
  }

  getProduto(token){
    this.produtosProvider.getProdutos(token).then(data =>{
      this.produtos = data
      this.formatNome()
      this.loading.dismiss();
    })
  }

  produtoDetail(produto){
    this.navCtrl.push(ProductDatailPage, {produto})
  }

  formatNome(){
    for(let a=0; this.produtos.length>a; a++){
      this.produtos[a]['nome_curto'] = this.doTruncarStr(this.produtos[a]['nome'], 15)
    }
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

  getCategoria(token){
    this.produtosProvider.getCategoria(token).then(data =>{
      this.categorias = data
      console.log(data)
    })
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }
}
