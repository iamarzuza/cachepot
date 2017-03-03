import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { ProdutoService } from "../../providers/produto-service"
import { CategoriaService } from "../../providers/categoria-service"

import { Camera, File, Transfer, FilePath } from 'ionic-native';

declare var cordova: any;

/*
  Generated class for the ProdutoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-produto-modal',
  templateUrl: 'produto-modal.html'
})
export class ProdutoModalPage {

    produto : any;
    categorias : Array<any>;

    lastImage: string = null;
    loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,
                public produtoService : ProdutoService,
                public categoriaService : CategoriaService,
                public viewCtrl : ViewController) {

        this.produto = navParams.get('produto') || {} ;
        this.carregarCategorias();
    }

    ionViewDidLoad() {
      //console.log('ionViewDidLoad CategoriaModalPage');
    }

    close () {
      this.viewCtrl.dismiss();
    }

    salvar() {
       //console.log("categoria" + JSON.stringify(this.categoria));
       this.produto.foto = this.lastImage;

       if ( this.produto.id ) {
          this.produtoService.update(this.produto).then( (res) => {
             this.viewCtrl.dismiss();
          }, (erro) => {
              console.log(" Erro no GET das categorias !");
          });
      }
      else {

        this.uploadImage();

        this.produtoService.insert(this.produto).then( (res) => {
           this.viewCtrl.dismiss();
        }, (erro) => {
            console.log(" Erro no GET das categorias !");
        });

      }

    }

    carregarCategorias() {
      this.categoriaService.findAll ().then( (categorias: Array<any>) => {
        this.categorias = categorias;
      }, (erro) => {
          this.categorias = [];
          console.log(" Erro no GET das categorias !");
      });

    }



    //public takePicture(sourceType) {
    public takePicture() {

        var sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        // Create options for the Camera Dialog

        var options = {
          quality: 50,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          targetWidth : 640,
          targetHeight : 640,
        };

        // Get the data of an image
        Camera.getPicture(options).then((imagePath) => {
          // Special handling for Android library
          if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
            FilePath.resolveNativePath(imagePath)  // transforma o caminho para a imagem ( deve ser um URL ?)
            .then(filePath => {  // em um caminho do sistma de arquivos
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);    // o caminho do sistema de arquivos
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?')); //o nome do arquivo
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
        }, (err) => {
          this.presentToast('Error while selecting image.');
        });
    }

    // Create a new name for the image
    private createFileName() {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
      return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
      File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
      }, error => {
        this.presentToast('Error while storing file.');
      });
    }

    private presentToast(text) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }


    public uploadImage() {
      // Destination URL

    //  this.presentToast( "Fazendo upload ...");
    //  return;
    //}

      //var url = "http://10.4.1.248/upload";
      var   url  : string = "https://product-api-master-iamarzuza.c9users.io/upload";


      // File for Upload
      var targetPath = this.pathForImage(this.lastImage);

      // File name only
      var filename = this.lastImage;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };

      const fileTransfer = new Transfer();

      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();

      // Use the FileTransfer to upload the image
      fileTransfer.upload(targetPath, url, options).then(data => {
        this.loading.dismissAll()
        this.presentToast('Image succesful uploaded.');
      }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
      });
    }



}
