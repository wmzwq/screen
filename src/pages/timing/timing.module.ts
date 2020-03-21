import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimingPage } from './timing';

@NgModule({
  declarations: [
    TimingPage,
  ],
  imports: [
    IonicPageModule.forChild(TimingPage),
  ],
})
export class TimingPageModule {}
