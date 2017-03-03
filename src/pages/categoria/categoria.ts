import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController  } from 'ionic-angular';
import { CategoriaService } from "../../providers/categoria-service"

import { CategoriaModalPage } from "../categoria-modal/categoria-modal"

/*
  Generated class for the Categoria page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html'
})
export class CategoriaPage {

  categorias : Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public categoriaService : CategoriaService,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
    this.findAll();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

  delCategoria( c ) {

    console.log("deletar");

    let alert = this.alertCtrl.create  ({
        title : "Confirma a exclusão desta categoria ?",
        message : "Deseja realmente excluir a categoria ?",
        buttons: [
          {
            text: 'Sim',
            handler: data => {
              this.categoriaService.delete ( c.id ).then( ( res ) => {
                if  ( res )  {
                  this.findAll();
                }
              }, (erro) => {
                  console.log("Erro no GET das categorias !");
              });            }
          },
          { text: 'Não' }
       ]
    });

    alert.present();

  }


  modalCategoria ()  {

    //console.log("modal");

    let modal = this.modalCtrl.create (CategoriaModalPage);
    modal.present ();

    modal.onDidDismiss ( (param) => {
        this.findAll();
    });

  }

  modalCategoriaUpdate ( categoria )  {

    //console.log("modal");

    let modal = this.modalCtrl.create (CategoriaModalPage, { categoria : categoria });
    modal.present ();

    modal.onDidDismiss ( (param) => {
        this.findAll();
    });

  }

  findAll () {
      this.categoriaService.findAll ().then( (categorias: Array<any>) => {
        this.categorias = categorias;
      }, (erro) => {
          console.log(" Erro no GET das categorias !");
      });
  }

}
