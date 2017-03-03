import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController  } from 'ionic-angular';
import { ProdutoService } from '../../providers/produto-service';
import { ProdutoModalPage } from '../produto-modal/produto-modal'
/*
  Generated class for the Produto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html'
})
export class ProdutoPage {
  urlfotos  : string = "https://product-api-master-iamarzuza.c9users.io/fotos/";
  produtos : Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public produtoService : ProdutoService,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
    this.findAll();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoPage');
  }

  delProduto( produto ) {

    console.log("deletar");

    let alert = this.alertCtrl.create  ({
        title : "Confirmação ?",
        message : "Deseja realmente excluir o produto ?",
        buttons: [
          {
            text: 'Sim',
            handler: data => {
              this.produtoService.delete ( produto.id ).then( ( res ) => {
                if  ( res )  {
                  this.findAll();
                }
              }, (erro) => {
                  console.log("Erro no GET dos produtos !");
              });            }
          },
          { text: 'Não' }
       ]
    });

    alert.present();

  }


  modalProduto ()  {

    //console.log("modal");

    let modal = this.modalCtrl.create (ProdutoModalPage);
    modal.present ();

    modal.onDidDismiss ( (param) => {
        this.findAll();
    });

  }

  modalProdutoUpdate ( produto )  {

    //console.log("modal");

    let modal = this.modalCtrl.create (ProdutoModalPage, { produto : produto });
    modal.present ();

    modal.onDidDismiss ( (param) => {
        this.findAll();
    });

  }

  findAll () {
      this.produtoService.findAll ().then( (produtos: Array<any>) => {
        this.produtos = produtos;

          //console.log(" produtos !" + produtos);

      }, (erro) => {
          console.log(" Erro no GET das produtos !");
      });
  }

}
