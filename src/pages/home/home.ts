import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ProdutoPage } from '../produto/produto'
import { CategoriaPage } from '../categoria/categoria'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabProduto : any;
  tabCategoria : any;

  constructor(public navCtrl: NavController) {
      this.tabProduto = ProdutoPage;
      this.tabCategoria = CategoriaPage;
  }

}
