import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrlPage } from './url';

@NgModule({
  declarations: [
    UrlPage,
  ],
  imports: [
    IonicPageModule.forChild(UrlPage),
  ],
})
export class UrlPageModule {}
