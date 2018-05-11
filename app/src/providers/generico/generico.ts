import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ENV } from '../../ENV';
import { Storage } from '@ionic/storage';

@Injectable()
export class GenericoProvider {

  token: any

  constructor(
    public http: Http,
    public storage: Storage
  ) 
  {
    console.log('Hello GenericoProvider Provider');
  }  
 
  login(credentials) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://geovanedevelop.pythonanywhere.com/api_token_auth', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          console.log(res)
        }, (err) => {
          reject(err);
        });

    });

  }
 /*
 
  login(credentials) {

    return this.http.post('http://www.dbelissima.com.br/api/login', credentials)
    .toPromise()
    .then(data => {
      console.log(data)
    })
    .catch(e => {
        console.log('login error 1', e)
        return {"login": "false", "e": e}
    });
  } 
   */
  

}
