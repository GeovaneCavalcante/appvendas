import { ENV } from './../../ENV';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProdutosProvider Provider');
  }

  getProdutos(token) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.get(ENV.apiUrl + 'api_produtos/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

  getCategoria(token) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.get(ENV.apiUrl + 'api_categoria/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

}
