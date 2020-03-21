import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricalPage } from './historical';

@NgModule({
  declarations: [
    HistoricalPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricalPage),
  ],
})
export class HistoricalPageModule {}
