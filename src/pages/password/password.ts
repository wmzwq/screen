import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UrlPage } from '../url/url';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage extends BaseUI{
  start: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
  determine(){
    if(this.start=="123456"){
      this.navCtrl.push(UrlPage)
    }
    else{
      const toast = super.showToast(this.toastCtrl, '密码错误，请重新输入', );
      
    
    }
  }
}
