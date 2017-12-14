import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';
@IonicPage({
	name: 'tabs-page', 
	segment: 'tabs-page'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = 'HomePage';
  tab4Root:any = 'ListSongPage';
  
  tab2Root:any = 'AboutPage';
  tab3Root:any = 'ContactPage';

  constructor(public navCtrl: NavController) {

  }
}
