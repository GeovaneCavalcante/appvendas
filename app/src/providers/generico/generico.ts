import { HttpClient } from '@angular/common/http';;
import { Injectable } from '@angular/core';
import { ENV } from '../../ENV';
import { Storage } from '@ionic/storage';

@Injectable()
export class GenericoProvider {

  token: any

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) 
  {
    console.log('Hello GenericoProvider Provider');
  }  
 
  login(credentials) {

    return this.http.post('http://geovanedevelop.pythonanywhere.com/api_token_auth/', credentials)
    .toPromise()
    .then(data => {
      this.setToken(data)
      return data
    })
    .catch(e => {
        console.log('login error 1', e)
        return {"login": "false", "e": e}
    });
  } 

  setToken(data){
    this.storage.set('token', data['token']);
    this.storage.set('user', data['user']);
    console.log(data)
  }
  

}
