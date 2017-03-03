import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  urlBase : string = "https://product-api-master-iamarzuza.c9users.io/api/category";

  constructor(public http: Http) {
    console.log('Hello CategoriaService Provider');
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

  insert ( categoria )   {
      let cab = new Headers();
      cab.append('Content-type', 'application/json') ;

      return  new Promise ( ( resolve, reject ) => {

        console.log("no service categoria" + JSON.stringify( categoria ));

          this.http.post(this.urlBase,  JSON.stringify(categoria) , { headers: cab}  )
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }

  update ( categoria )   {
      let cab = new Headers();
      cab.append('Content-type', 'application/json') ;

      return  new Promise ( ( resolve, reject ) => {

          this.http.put(this.urlBase,  JSON.stringify(categoria) , { headers: cab}  )
              .map( res => res.json() )
              .subscribe ( data => {
                  resolve(data);
              }, error => {
                  reject (error);
              });

      } );
  }

}
