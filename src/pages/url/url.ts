import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { HttpSerProvider } from '../../app/http-serve';
import {
  Md5
} from 'ts-md5/dist/md5';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the UrlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-url',
  templateUrl: 'url.html',
})
export class UrlPage extends BaseUI{
  start: string;
  end: string;
  notifications: string;
  allow: boolean;
  hp: boolean;
  mp: boolean;
  mark: any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private httpservice: HttpSerProvider,public toastCtrl: ToastController) {
    super();
    this.notifications="自定义";
    　
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrlPage');
  }
ionViewDidEnter(){

}
back(){
    if(window.localStorage.getItem('username')){
    this.navCtrl.push(ContactPage)
  }
 else{
this.navCtrl.push(LoginPage)
 }
}
determine(){
  console.log(this.start)
  if(this.start==undefined||this.end==undefined){
    const toast = super.showToast(this.toastCtrl, '地址不能为空' );
  
  }
  else{
   
 

this.httpservice.get(this.start+'/login/checkloginWy?data={"username":"nhkz","password":"' + Md5.hashStr("66666").toString() + '"}', null).then(res => {
  console.log(res)
if(res.success==false){
  console.log("http接口连接失败")

  document.getElementById('mark1').innerHTML = "连接失败"

}
else{
 
  console.log("http接口连接成功")
  document.getElementById('mark1').innerHTML = "连接成功"
}    

})
 var sock= new WebSocket(this.end);

    if ("WebSocket" in window) {
      sock .onopen = function () {
      console.log("通信接口连接成功")
      document.getElementById('mark2').innerHTML = "连接成功"
      }
      sock .onerror = function (data) {
        document.getElementById('mark2').innerHTML = "连接失败"
        console.log("通信接口连接失败")
        console.log('onerror',data);
      }
    }
  }

   
 
}
save(){
  if( document.getElementById('mark2').innerHTML == "连接成功"&& document.getElementById('mark1').innerHTML == "连接成功"){
    window.localStorage.setItem('url', this.start);
    window.localStorage.setItem('wsurl', this.end);
    const toast = super.showToast(this.toastCtrl,  '保存成功',);
   
  }
 else{
  const toast = super.showToast(this.toastCtrl,  '请检查是否连接成功',);
 
 
 }
  
}
segmentChanged(){
  if(this.notifications=="云"){
    this.start="http://122.228.89.215:8897";
    this.end="ws://122.228.89.215:8182"
    　$("#start").attr("disabled","disabled");
    $("#end").attr("disabled","disabled");
    document.getElementById('mark1').innerHTML = ""
    document.getElementById('mark2').innerHTML = ""
  }
 else {
    this.start="";
    this.end=""
    $("#start").removeAttr("disabled");
    $("#end").removeAttr("disabled");
    document.getElementById('mark1').innerHTML = ""
    document.getElementById('mark2').innerHTML = ""
  }
}
}
