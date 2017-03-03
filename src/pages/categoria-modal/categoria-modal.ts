import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { CategoriaService } from "../../providers/categoria-service"

/*
  Generated class for the CategoriaModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categoria-modal',
  templateUrl: 'categoria-modal.html'
})
export class CategoriaModalPage {

  categoria : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public categoriaService : CategoriaService,
              public viewCtrl : ViewController) {

      this.categoria = navParams.get('categoria') || {} ;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CategoriaModalPage');
  }

  close () {
    this.viewCtrl.dismiss();
  }

  salvar() {
     //console.log("categoria" + JSON.stringify(this.categoria));

     if ( this.categoria.id ) {
        this.categoriaService.update(this.categoria).then( (res) => {
           this.viewCtrl.dismiss();
        }, (erro) => {
            console.log(" Erro no GET das categorias !");
        });
    }
    else {
      this.categoriaService.insert(this.categoria).then( (res) => {
         this.viewCtrl.dismiss();
      }, (erro) => {
          console.log(" Erro no GET das categorias !");
      });

    }

  }

}
