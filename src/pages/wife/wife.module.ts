import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WifePage } from './wife';

@NgModule({
  declarations: [
    WifePage,
  ],
  imports: [
    IonicPageModule.forChild(WifePage),
  ],
})
export class WifePageModule {}
