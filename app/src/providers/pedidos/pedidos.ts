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

    return this.http.get(ENV.apiUrl + 'api_order/list_orders/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

  createPedido(token, dados) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)
    .set("Content-Type", "application/json")

  return this.http.post(ENV.apiUrl + 'api_order/order/', dados, {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

  updatePedido(token, dados) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)
    .set("Content-Type", "application/json")

  return this.http.put(ENV.apiUrl + 'api_order/order/' + dados['id'] + '/', dados, {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 
  
  deletePedido(token, id) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)
    .set("Content-Type", "application/json")

  return this.http.delete(ENV.apiUrl + 'api_order/order/' + id + "/", {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 
  
}
