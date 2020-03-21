import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { UrlPage } from '../url/url';
import { PasswordPage } from '../password/password';
import { BaseUI } from '../../app/baseui';


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends BaseUI{

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  back(){
    this.navCtrl.push(ContactPage)
  }
  logIn(){
    window.localStorage.removeItem('notifications');
    window.localStorage.removeItem('equip');
    this.navCtrl.push(LoginPage)
  }
  check(){
    const modal = this.modalCtrl.create(PasswordPage);
      modal.present();
  }
  refresh(){
    const prompt = this.alertCtrl.create({
      title: '请输入刷新时间',
      message: "时间单位为秒",
      inputs: [
        {
          name: 'title',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log(data.title)
            const toast = super.showToast(this.toastCtrl, "设置成功");
            window.localStorage.setItem('refresh',data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}
