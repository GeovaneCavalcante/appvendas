import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CidadeEstadoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CidadeEstadoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CidadeEstadoProvider Provider');
  }

  getCidades(uf){

      return new Promise(resolve => {
          this.http.get('https://gesso.herokuapp.com/api/cidades/' + uf)
              .subscribe(
                  data =>{
                      console.log(data);
                      resolve(data['resultado']);
                  },
                  err=>{
                      console.log(err)
                  }
              )
      
      })
  }

}
