import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AppUpdate } from '@ionic-native/app-update';
@IonicPage({
	name: 'AboutPage', 
	segment: 'page-about'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private appUpdate: AppUpdate) {

  }
  checkAppUpdate(){
    const updateUrl = 'http://gtqc2api.mcmhq.com/nqncomapi/Content/update.xml';
    this.appUpdate.checkAppUpdate(updateUrl);
  }
}
