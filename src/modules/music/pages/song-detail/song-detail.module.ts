import { PlayerService } from '../../providers/player.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongDetailPage } from './song-detail';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}
@NgModule({
  declarations: [
    SongDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
  ],
  providers:[PlayerService]
})
export class SongDetailPageModule {}
