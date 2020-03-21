import { Component } from '@angular/core';
import { Platform, LoadingController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../pages/login/login';
import { HttpSerProvider } from './http-serve';
import { ContactPage } from '../pages/contact/contact';
import {Network} from "@ionic-native/network";
import {
  Md5
} from 'ts-md5/dist/md5';
import { NativeService } from '../providers/NativeService ';
import { WifePage } from '../pages/wife/wife';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  username: string;
  password: string;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public screenOrientation: ScreenOrientation, 
    public storage: Storage,private httpservice: HttpSerProvider,private network: Network,private loadingCtrl: LoadingController, 
    public modalCtrl: ModalController,private nativeService:NativeService) {
      this.username=window.localStorage.getItem('username');
      this.password=window.localStorage.getItem('password');
    this.storage.get('firstIn').then((result) => {

      // if (result) {
        if (window.localStorage.getItem('username')) {
        
           this.rootPage =ContactPage;
        } else {
          this.rootPage = LoginPage;
        }
      // } 

    });
    platform.ready().then(() => {
 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
//  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
this.nativeService.detectionUpgrade()
this.nativeService.GetPageListAPP()
    this.checkNetwork();
    statusBar.styleDefault();
    setTimeout(() => { 
         splashScreen.hide();
    }, 1000)
    });
  }
  checkNetwork() {
    if(this.network.type === 'unknown') {
      console.log('This is a unknown network, please be careful!');
    } else if(this.network.type === 'none') {
      console.log('none network!');
      const modal = this.modalCtrl.create(WifePage);
      modal.present();
    } else {
      console.log('we got a ' + this.network.type + ' connection, woohoo!');
    }
    
  }
}
