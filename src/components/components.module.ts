import { CounterWrapperComponent } from './counter-wrapper/counter-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { IonicModule } from 'ionic-angular';
import { PlayerAudioComponent } from './player-audio/player-audio';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
export function myCustomAudioProviderFactory() {
	return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
  }
@NgModule({
	declarations: [ProgressBarComponent, PlayerAudioComponent,CounterWrapperComponent],
	imports: [ IonicModule,    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
	],
	exports: [ProgressBarComponent, PlayerAudioComponent, CounterWrapperComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
	
})
export class ComponentsModule {}
