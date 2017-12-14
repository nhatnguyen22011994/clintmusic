import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Helpers {
  private loading: any;

  constructor(
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ){
  }

  //Loading
  public showLoading() {
    this.loading = this.loadingController.create({
      dismissOnPageChange: false,
      duration: 15000
    });
    this.loading.present();
    return this.loading;
  }

  public hideLoading() {
    let self = this;
    if(self.loading){
      setTimeout(()=>{
        self.loading.dismiss();  
      }, 50);
    }
  }

  public showMessage(message, optHideTime=0) {    
    if(optHideTime == 0) {
      optHideTime = 120000;
    }

    this.loading = this.loadingController.create({
      content: message, 
      duration: optHideTime
    });

    this.loading.present();
    return this.loading;
  }

  //Dialog
  alert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  confirm(title, message, callBack) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: callBack
        }
      ]
    });
    confirm.present();
  }
  confirm2(title, message, callBack) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: callBack
        }
      ]
    });
    confirm.present();
  }

  backPageConfirm(resolve:any, reject:any) {
    let confirm = this.alertCtrl.create({
      title: "Confirm Message",
      message: "Are you sure you want to leave this page?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            reject();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            resolve();
          }
        }
      ]
    });
    confirm.present();
  }

  //Toast
  toast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 1000,
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: " X",
    dismissOnPageChange: true
  });
  toast.present();
}
}