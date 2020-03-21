import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeEditPage } from './time-edit';

@NgModule({
  declarations: [
    TimeEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeEditPage),
  ],
})
export class TimeEditPageModule {}
