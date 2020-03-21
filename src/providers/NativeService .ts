import {Injectable} from '@angular/core';
import {Platform, AlertController, ToastController} from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {File} from '@ionic-native/file';
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import {FileOpener} from '@ionic-native/file-opener';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Rx';
import { HttpSerProvider } from '../app/http-serve';
import { BaseUI } from '../app/baseui';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class NativeService extends BaseUI{
    loginMark: string;
    token: string;
  F_UserId: any;
  version: any;
  url: string;
  onSuccess: (value: any) => any;
  onError: (reason: any) => PromiseLike<never>;
  status: number;

  constructor(private platform: Platform,
              private alertCtrl: AlertController,
              private transfer: FileTransfer,
              private appVersion: AppVersion,
              private file: File,
              private fileOpener: FileOpener,
              // private msg : MsgProvider,
              private inAppBrowser: InAppBrowser,
             private httpservice: HttpSerProvider,
             public toastCtrl: ToastController, public nativeAudio: NativeAudio) {
                super();
                this.status=0
                this.loginMark = window.localStorage.getItem('loginMark');
                this.token = window.localStorage.getItem('token');
                if (window.localStorage.getItem('url')) {
                  this.url = window.localStorage.getItem('url');             
                }
                this.nativeAudio.preloadSimple('uniqueId1', 'assets/lib/gz.mp3').then(this.onSuccess, this.onError)
                
  }


  /**
   * 检查app是否需要升级
   */
  detectionUpgrade() {
  //this.appVersion.getVersionNumber()  获取当前apk的版本号类似于1.0.2
    this.appVersion.getVersionNumber().then(res=>{
        var _that = this;
        var url = "http://122.228.89.215:8897/Edition/getpagelist";
        this.httpservice.post(url, JSON.stringify({
            "data": "{'pagination':{rows:50,page: 1,sidx:'F_EditionNumber',sord:'DESC'},'queryJson':\"{'F_EditionType':'4'}\"} "
         
        })).then(req => {
          try {
              console.log("banben",req)
              var appVersion = req.data.rows[0].F_EditionNumber
              var downLoadUrl=req.data.rows[0].F_DownloadSite
            window.localStorage.setItem('downLoadUrl', downLoadUrl);
        //当前apk和调用接口的版本号进行对比
      if(appVersion>res ){
        if(this.status==0){
          this.status=1
          this.downloadApp();
        }
        // this.alertCtrl.create({
        //   title: '升级',
        //   subTitle: '发现新版本,是否立即升级？',
        //   buttons: [{text: '取消'},
        //     {
        //       text: '确定',
        //       handler: () => {
            
        //       }
        //     }
        //   ]
        // }).present();
  
      }
          
          } catch (e) {
            const toast = super.showToast(this.toastCtrl, "/Edition/getpagelist接口异常:" + e);
    
          }
    
        });
    
    })
      
  }

  /**
   * 下载安装app
   */
  downloadApp() {
    if (this.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();
      let that = this;
      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalApplicationStorageDirectory+'人机交互.apk'; //apk保存在手机里的目录
        const url = localStorage.getItem("downLoadUrl");     //调用接口获取到的下载路径
        fileTransfer.download(url, apk ).then((entry) => {
        //  that.openApk(entry.toURL());
        });
  
        fileTransfer.onProgress((event: ProgressEvent) => {
          let num = Math.floor(event.loaded / event.total * 100);
          if (num === 100) {
            alert.dismiss();
          } else {
            let title = document.getElementsByClassName('alert-title')[0];
            title && (title.innerHTML = '下载进度：' + num + '%');
          }
        });
     
    }
    if (this.isIos()) {
      this.openUrlByBrowser(localStorage.getItem("downLoadUrl"));
    }
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url:string):void {
    this.inAppBrowser.create(url, '_system');
  }

  /**
   * 打开下载的apk
   */
  openApk(url:string){
    this.fileOpener.open(url,'application/vnd.android.package-archive').then(res=>{
        const toast = super.showToast(this.toastCtrl, "打开apk成功"+res);
         
            }).catch(err=>{
                const toast = super.showToast(this.toastCtrl, "打开apk失败!"+err);
           
            })
  }
  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
  getVersionNumber(): Observable <string> {
    return Observable.create(observer => {
      this.appVersion.getVersionNumber().then((value: string) => {
        observer.next(value);
      }).catch(err => {
        observer.error(false);
      });
    });
  }
  GetPageListAPP() {
    var url = this.url + "/UserAppInfo/GetPageListAPP";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
    })).then(res => {
      try {
        console.log("user", res)
        this.F_UserId=res.data.rows[0].F_UserId
        this.FailurePush()
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/UserAppInfo/GetPageListAPP接口异常:" + e);

      }

    });
  }
  FailurePush() {
    this.appVersion.getVersionNumber().then(res=>{
    this.version=res
    console.log("ss",res)
    })
    var remote = {
      time: 10,
      flag:0,
      success: true,
      MAX_WAIT_TIME: 10
    };
    remote.time = remote.MAX_WAIT_TIME;
    remote.success = false;
    var sock = new WebSocket("ws://122.228.89.215:8182");
    function reconnect(){
     sock = new WebSocket("ws://122.228.89.215:8182");
    }
    sock.binaryType = "arraybuffer"
    if ("WebSocket" in window) {
      sock.onopen = () => {
        var ContentDate = [
          "{",
          "\"Cmd\":\"touch\",",
          "\"UserId\":\"" +this.F_UserId +"\",",
          "\"Type\":\"alarmplus,alarmplusreturn\",",
          "\"Version\":\"" +this.version +"\"",
          "}"
        ].join("");
        console.log(ContentDate)

        sock.send(ContentDate);
      };
      sock.onmessage =  (evt)=> {
        var received_msg = evt.data;
        var receivedJson = JSON.parse(received_msg);
        console.log(receivedJson);

        if (receivedJson.Cmd == "alarmplus") {
         console.log("cs")
         this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
        }
        remote.flag=1;
    
    };
    sock.onclose = function () {
      console.log("ConnectShut...");
      if(remote.flag==0){
        reconnect()
      }
    
  };
  sock.onerror = function (data) {
      console.log("DataSendFailed...");
      console.log(data);
      if(remote.flag==0){
        reconnect()
      }
  }
    }
    else {
      const toast = super.showToast(this.toastCtrl, "您的系统不支持 WebSocket!");
  }
  }
}
