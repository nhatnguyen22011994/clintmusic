import { Component, ViewChild } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import {
  ActionSheetController,
  AlertController,
  App,
  FabContainer,
  ItemSliding,
  List,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  Refresher,
  ToastController,
  IonicPage,
} from 'ionic-angular';
import { File } from '@ionic-native/file';
import _ from 'lodash';
import { Media, MediaObject } from '@ionic-native/media';
import { Diagnostic } from '@ionic-native/diagnostic';
import { NQNComData } from '../../../../providers/nqncom-data';
import { Helpers } from '../../../../providers/helpers';
/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

// import { ConferenceData } from '../../providers/conference-data';
// import { UserData } from '../../providers/user-data';

// import { SessionDetailPage } from '../session-detail/session-detail';
// import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
@IonicPage({
	name: 'ListSongPage', 
	segment: 'list-song'
})
@Component({
  selector: 'page-list-song',
  templateUrl: 'list-song.html',
})
export class ListSongPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  songs: any = [];
  confDate: string;
  processing = 0;
  fileTransfer: FileTransferObject = this.transfer.create();
  isDownloading = false;
  fileMedia: MediaObject = null;
  currentTrack:{};
  hotDownloadUrl ='';
  constructor(public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public cqnComData: NQNComData,
    private transfer: FileTransfer, private file: File,
    public helpers: Helpers,
    private platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    private media: Media,
    private diagnostic: Diagnostic) {
  }


  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.getData();
    this.platform.ready();
    this.currentTrack =  {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'https://yt3.ggpht.com/pHwZj3tkgC3SJFbuqebBoT7WtVcIwAijEmcbe9VDCauv9ZlG6uS2zjvZQUSO7SfFqa3xjYqGp_L4QbM7=s900-nd-c-c0xffffffff-rj-k-no',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    };
  }

  getData() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();
    this.hotDownloadUrl ='';
    
    // this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
    //   this.shownSessions = data.shownSessions;
    //   this.groups = data.groups;
    // });
    if(this.queryText && this.queryText!='undefined'){
      this.helpers.showLoading();
      
    this.cqnComData.getSongList(this.queryText).then((songs: any) => {
      console.log(songs);
    if(songs && songs.length && songs.length> 0){
      this.songs = [];
      
      this.songs = songs;
    this.helpers.toast(`Get completed: ${this.songs.length}`);
    this.helpers.hideLoading();
    
    }
    else{
      this.helpers.toast(`Get error: ${this.songs}`);
    this.helpers.hideLoading();
    
    }
    
  });
  }
}



  
  downloadFile(slidingItem, url) {
    if(this.isDownloading){
      slidingItem.close();
      this.helpers.toast(`Waiting download file!`);
      return;
    }
    this.isDownloading = true;
    this.processing = 0;
    this.hotDownloadUrl = url;
    let fileName = this.file.externalRootDirectory + '/Music/' +
      decodeURI(url.substring(url.lastIndexOf('&v5=') + 4, url.lastIndexOf('.'))
        + Date.now()
        + url.substring(url.lastIndexOf('.')));

    this.fileTransfer.onProgress((progressEvent) => {
      if (progressEvent.lengthComputable) {
        this.processing = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        if(this.processing == 100){
          this.hotDownloadUrl = '';
        }
      }
    });

    this.fileTransfer.download(encodeURI(url), fileName, true).then((entry) => {
      this.helpers.toast(`Download success`);
      this.isDownloading = false;
    }, (error: any) => {
      // handle error
      this.helpers.toast(` error  ${error.source}`);
    });
   
    slidingItem.close();

    // fileTransfer.onProgress(listener => {
    //   // this.helpers.toast(` downloading ${listener.total}`);
    // });

  }
  playFile(slidingItem, url) {
    this.fileMedia = this.media.create(url);
    this.fileMedia.play();
    slidingItem.close();
  }
  stopFile(slidingItem) {
    this.isDownloading = false;
    this.fileTransfer.abort();
    this.fileMedia.stop();
    slidingItem.close();

  }
  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.cqnComData.getSongList(this.queryText).then((songs: any) => {
      console.log(songs);
      this.songs = songs;
      setTimeout(() => {
        refresher.complete();
        this.helpers.toast(`Data have been updated.`);
      }, 1000);
    });
  }
  checkPermissionStorage() {
    return new Promise((resolve, reject) => {
      this.diagnostic.getExternalStorageAuthorizationStatus().then(havePermission => {
        if (havePermission != 'GRANDTED') {
          this.diagnostic.requestExternalStorageAuthorization().then(() => {
            //User gave permission 
            resolve(true);
          }).catch((error: any) => {
            resolve(false);
          });
        }
        else {
          resolve(true);
        }
      });
    })
  }
  goToDetail(song){
    console.log(song);
    this.navCtrl.push('SongDetailPage');
  }
  presentActionSheet(slidingItem: ItemSliding, song, type = 'download') {
    this.helpers.showLoading();
    this.checkPermissionStorage().then(result => {
      if (!result) {
        return;
      }
      this.cqnComData.download(song.Url).then((downloadUrls: object) => {
        this.helpers.hideLoading();
        var buttons = [];
        this.hotDownloadUrl = '';
        _.forIn(downloadUrls, (value, key) => {
          if (value) {
            let buttonDownload = {
              text: key,
              handler: () => {
                if (type == 'download')
                  this.downloadFile(slidingItem, value);
                else {
                  this.playFile(slidingItem, value);
                }
              }
            };
            buttons.push(buttonDownload);
          }
        });
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Select type',
          buttons: buttons
        });
        actionSheet.present();
      });
    });
  }
  
}
