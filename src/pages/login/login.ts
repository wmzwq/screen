import {
  Component
} from '@angular/core';
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';

import {
  HttpClient
} from '@angular/common/http';
import {
  Http,
  Jsonp,
  Headers
} from '@angular/http';
import 'rxjs/Rx';
import {
  Storage
} from '@ionic/storage';
import {
  Md5
} from 'ts-md5/dist/md5';
import {
  HttpSerProvider
} from '../../app/http-serve';
import {
  ContactPage
} from '../contact/contact';
import {
  PasswordPage
} from '../password/password';
import {
  BaseUI
} from '../../app/baseui';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  list: any[];
  iconStyle: object = {
    'color': '#488aff',
    'font-size': '1.4em'
  };
  public isShow: boolean = false;
  settings: any;
  public isRemember: boolean = false;
  expenses: any = [];
  username: string;
  password: string;
  login: Array < any > = [];
  spinner1: boolean = true;
  url: string;
  myInterval: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private https: HttpClient,
    private http: Http,
    private jsonp: Jsonp,
    public modalCtrl: ModalController,
    public storage: Storage,

    private platform: Platform,
    private httpservice: HttpSerProvider,
    public toastCtrl: ToastController,
  ) {
    super();
    if (window.localStorage.getItem('url') && window.localStorage.getItem('wsurl')) {
      this.url = window.localStorage.getItem('url');

    } else {
      var toast = super.showToast(this.toastCtrl, "请设置接口访问地址");


      const modal = this.modalCtrl.create(PasswordPage);
      modal.present();
      // this.url="http://122.228.89.215:8897";
    }
    if(window.localStorage.getItem('username')!=null){
      this.username=window.localStorage.getItem('username')
      this.password=window.localStorage.getItem('password')
      this.myInterval = setInterval(() => {
       
       
        this.httpservice.get(this.url + '/login/checkloginWy?data={"username":"' +this. username + '","password":"' + Md5.hashStr(this.password).toString() + '"}', null).then(res => {
          try {
            if (res.code == 200) {
              window.localStorage.setItem('username', this. username);
              window.localStorage.setItem('password', this. password);
              window.localStorage.setItem('loginMark', res.data.loginMark);
              window.localStorage.setItem('token', res.data.token);
    
    
              this.navCtrl.setRoot(ContactPage);
    
              console.log(res.data);
            } else {
              const toast = super.showToast(this.toastCtrl, res.info);
    
            }
          } catch (error) {
            const toast = super.showToast(this.toastCtrl, "/login/checkloginWy接口异常:" + error);
    
          }
    
          clearInterval(this.myInterval);
        })
        
  
      }, 180000);
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewDidEnter() {

  }
  logIn() {
    this.httpservice.get(this.url + '/login/checkloginWy?data={"username":"' +this. username + '","password":"' + Md5.hashStr(this.password).toString() + '"}', null).then(res => {
      try {
        if (res.code == 200) {
          window.localStorage.setItem('username', this. username);
          window.localStorage.setItem('password', this. password);
          window.localStorage.setItem('loginMark', res.data.loginMark);
          window.localStorage.setItem('token', res.data.token);

          clearInterval(this.myInterval);
          this.navCtrl.setRoot(ContactPage);

          console.log(res.data);
        } else {
          const toast = super.showToast(this.toastCtrl, res.info);

        }
      } catch (error) {
        const toast = super.showToast(this.toastCtrl, "/login/checkloginWy接口异常:" + error);

      }


    })
  }


}
