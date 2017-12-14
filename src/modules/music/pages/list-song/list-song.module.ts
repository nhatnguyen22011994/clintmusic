import { Helpers } from '../../../../providers/helpers';
import { NQNComData } from '../../../../providers/nqncom-data';
import { ComponentsModule } from '../../../../components/components.module';
import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { ListSongPage } from './list-song';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    ListSongPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSongPage),
    ComponentsModule
  ],
  exports: [
    ListSongPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NQNComData,
    FileTransfer,
    File,
    Helpers,
    Media,
    Diagnostic 
  ],
})
export class ListSongPageModule {}
