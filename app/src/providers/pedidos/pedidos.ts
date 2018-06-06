import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from './../../ENV';



@Injectable()
export class PedidosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PedidosProvider Provider');
  }

  getPedidos(token) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.get(ENV.apiUrl + 'api_pedidos/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 
  
}
