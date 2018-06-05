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
  
  updateCliente(values, token, id) {

    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)
    console.log(token)

    return this.http.put(ENV.apiUrl + 'api_client/' + id + '/', values, {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 

  deleteCliente(id, token) {

    let headers = new HttpHeaders()
    .set("Authorization", "JWT " + token)

    return this.http.delete(ENV.apiUrl + 'api_client/' + id + '/', {headers: headers})
    .toPromise()
    .then(data => {
      return data
    })
    .catch(error => {
      return error
    });
  } 



}
