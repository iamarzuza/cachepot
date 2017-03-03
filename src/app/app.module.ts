import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProdutoPage } from '../pages/produto/produto';
import { CategoriaPage } from '../pages/categoria/categoria';
import { CategoriaModalPage } from '../pages/categoria-modal/categoria-modal';
import { ProdutoModalPage } from '../pages/produto-modal/produto-modal'

import { ProdutoService } from "../providers/produto-service"
import { CategoriaService } from "../providers/categoria-service"


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProdutoPage,
    CategoriaPage,
    CategoriaModalPage,
    ProdutoModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProdutoPage,
    CategoriaPage,
    CategoriaModalPage,
    ProdutoModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ProdutoService, CategoriaService]
})
export class AppModule {}
