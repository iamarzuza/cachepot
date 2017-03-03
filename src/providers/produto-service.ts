import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProdutoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProdutoService {

  urlBase : string = "https://product-api-master-iamarzuza.c9users.io/api/product";

  constructor(public http: Http) {
    console.log('Hello produtoService Provider');
  }

  findAll ( )   {
      return  new Promise ( ( resolve, reject ) => {

          this.http.get(this.urlBase)
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }

  delete ( id )   {
      return  new Promise ( ( resolve, reject ) => {

          this.http.delete(this.urlBase + "/" + id )
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }

  insert ( produto )   {
      let cab = new Headers();
      cab.append('Content-type', 'application/json') ;

      return  new Promise ( ( resolve, reject ) => {

        console.log("no service produto" + JSON.stringify( produto ));

          this.http.post(this.urlBase,  JSON.stringify(produto) , { headers: cab}  )
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }

  update ( produto )   {
      let cab = new Headers();
      cab.append('Content-type', 'application/json') ;

      return  new Promise ( ( resolve, reject ) => {

          this.http.put(this.urlBase,  JSON.stringify(produto) , { headers: cab}  )
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }


}
