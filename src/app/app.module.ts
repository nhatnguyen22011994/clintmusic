import { CounterWrapperComponent } from '../components/counter-wrapper/counter-wrapper';
import { PlayerService } from '../modules/music/providers/player.service';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AppUpdate } from '@ionic-native/app-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Helpers } from '../providers/helpers';
import { Media } from '@ionic-native/media';
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { HttpModule } from '@angular/http';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { AccounttestPage } from '../pages/accounttest/accounttest';
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}
@NgModule({
  declarations: [
    MyApp,
    AccounttestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccounttestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // NQNComData,
    FileTransfer,
    File,
    Helpers,
    Media,
    Diagnostic,
    AppUpdate,
    PlayerService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class AppModule {}
