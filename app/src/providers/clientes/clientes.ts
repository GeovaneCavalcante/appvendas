import { ENV } from './../../ENV';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ClientesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClientesProvider Provider');
  }

  getClientes(token) {
    
    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.get(ENV.apiUrl + 'api_client/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

  createCliente(values, token) {

    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.post(ENV.apiUrl + 'api_client/', values, {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 



}
