import { Component,Input, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AudioProvider,ITrackConstraint  } from 'ionic-audio';
@Component({
 selector: 'player-audio',
 templateUrl: 'player-audio.html'
})
export class PlayerAudioComponent {

 @Input('currentTrack') currentTrack;

 myTracks: any[];
 allTracks: any[];
 selectedTrack = 0;
 playlist: ITrackConstraint[] = [];
//  currentTrack: ITrackConstraint;
 
   currentIndex: number = -1;
 constructor(private _cdRef: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams,private _audioProvider: AudioProvider) {
   this.myTracks = [{
     src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
     artist: 'John Mayer',
     title: 'Why Georgia',
     art: 'https://yt3.ggpht.com/pHwZj3tkgC3SJFbuqebBoT7WtVcIwAijEmcbe9VDCauv9ZlG6uS2zjvZQUSO7SfFqa3xjYqGp_L4QbM7=s900-nd-c-c0xffffffff-rj-k-no',
     preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
   },
   {
     src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
     artist: 'John Mayer',
     title: 'Who Says',
     art: 'https://yt3.ggpht.com/pHwZj3tkgC3SJFbuqebBoT7WtVcIwAijEmcbe9VDCauv9ZlG6uS2zjvZQUSO7SfFqa3xjYqGp_L4QbM7=s900-nd-c-c0xffffffff-rj-k-no',
     preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
   }];
 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad SongDetailPage');
   this.allTracks = this._audioProvider.tracks; 
   this.currentTrack = this.allTracks[0];
 }
 playSelectedTrack() {
   // use AudioProvider to control selected track 
   this._audioProvider.play(this.selectedTrack);
 }
 
 pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.pause(this.selectedTrack);
 }
        

 add(track: ITrackConstraint) {
   this.playlist.push(track);
 }

 play(track: ITrackConstraint, index: number) {
     this.currentTrack = track;
     this.currentIndex = index;
 }

 next() {
   // if there is a next track on the list play it
   if (this.playlist.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.playlist.length - 1) {
     let i = this.currentIndex + 1;
     let track = this.playlist[i];
     this.play(track, i);
     this._cdRef.detectChanges();  // needed to ensure UI update
   } else if (this.currentIndex == -1 && this.playlist.length > 0) {
     // if no track is playing then start with the first track on the list
     this.play(this.playlist[0], 0);
   }
 }

 onTrackFinished(track: any) {
   this.next();
 }

 clear() {
   this.playlist = [];
 }

}