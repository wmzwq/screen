import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  ToastController,
  ItemReorder
} from 'ionic-angular';
import {
  HttpSerProvider
} from '../../app/http-serve';
import {
  ContactPage
} from '../contact/contact';
import {
  TimingPage
} from '../timing/timing';
import * as $ from 'jquery';
import {
  WebSocketServiceProvider
} from '../../app/web-socket-service';
import {
  BaseUI
} from '../../app/baseui';
import {
  HistoricalPage
} from '../historical/historical';
/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage extends BaseUI {
  loginMark: string;
  token: string;
  dataId: string;
  AlarmStatus: any;
  deviceList: any;
  Online: string;
  url: string;
  wsurl: string;
  month: any;
  now: any;
  myInterval: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider,
    private wsService: WebSocketServiceProvider, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    super();
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.dataId = window.localStorage.getItem('dataId');
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      this.month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;

    };
    this.now = formatDate(new Date().getTime()); // 当前时间
    this.url = window.localStorage.getItem('url');
    this.wsurl = window.localStorage.getItem('wsurl');

    this.device()

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

  device() {
    var _that = this;
    var url = this.url + "/RelevanceStatistics/GetHardwareInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,

    })).then(res => {
      try {
        this.deviceList = res.data.rows
        console.log(res)
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/GetHardwareInfo接口异常:" + e);

      }

      // this.electricity()
    });
  }
  back() {
    this.navCtrl.push(ContactPage)
  }
  gotime(item) {
    this.navCtrl.push(TimingPage, {
      F_Id: item.F_Id,
      DataId: item.DataId
    })
  }

  real(item) {

    var url = this.url + "/RelevanceStatistics/GetCurrent";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'dataId':'" + item.DataId + "'} "
    })).then(res => {
      try {
        console.log("2", res)
        if(res.data==null){
          const toast = super.showToast(this.toastCtrl, "当前设备无数据" );
          return
        }
        if (res.data.AlarmStatus.Value == 0) {
          this.AlarmStatus = "正常"
        } else {
          this.AlarmStatus = "报警"

        }
        if (res.data.Online.Value == 0) {
          this.Online = "离线"
        } else {
          this.Online = "在线"
        }
        var $mask = $("<div class=\"data-container\">\n" +
          "    <div class=\"close\"><span></span></div>\n" +
          "    <ul class=\"data-content\">\n" +
          "        <li><p>" +(res.data.hasOwnProperty("Ia")? res.data.Ia.Value :"-")+ "A</p><p>A相电流</p><img src=\"assets/imgs/line-green.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("Ib")?res.data.Ib.Value:"-") + "A</p><p>B相电流</p><img src=\"assets/imgs/line-green.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("Ic")?res.data.Ic.Value :"-")+ "A</p><p>C相电流</p><img src=\"assets/imgs/line-green.png\"></li>\n" +
          "        <li><p>" +(res.data.hasOwnProperty("T_A")?res.data.T_A.Value:"-") + "℃</p><p>A相温度</p><img src=\"assets/imgs/line-purple.png\"></li>\n" +
          "        <li><p>" +(res.data.hasOwnProperty("T_B")?res.data.T_B.Value :"-")+ "℃</p><p>B相温度</p><img src=\"assets/imgs/line-purple.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("T_C")?res.data.T_C.Value :"-")+ "℃</p><p>C相温度</p><img src=\"assets/imgs/line-purple.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("Uaa")?res.data.Uaa.Value :"-")+ "V</p><p>A相电压</p><img src=\"assets/imgs/line-red.png\"></li>\n" +
          "        <li><p>" +(res.data.hasOwnProperty("Ubb")? res.data.Ubb.Value:"-") + "V</p><p>B相电压</p><img src=\"assets/imgs/line-red.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("Ucc")?res.data.Ucc.Value :"-")+ "V</p><p>C相电压</p><img src=\"assets/imgs/line-red.png\"></li>\n" +
          "        <li><p>" + (res.data.hasOwnProperty("LeakCurrent")?res.data.LeakCurrent.Value :"-")+ "mA</p><p>剩余电流</p><img src=\"assets/imgs/line-cyan.png\"></li>\n" +
          "        <li><p>" +  (res.data.hasOwnProperty("T_N")?res.data.T_N.Value :"-")+ "℃</p><p>N相温度</p><img src=\"assets/imgs/line-cyan.png\"></li>\n" +
          "        <li><p>" + 0.0 + "kWh</p><p>电能</p><img src=\"assets/imgs/line-cyan.png\"></li>\n" +
          "    </ul>\n" +
          "</div>");
        $("ion-content").append($mask);
        $("ion-content").delegate(".close", "click", function () {
          $mask.remove();
        });
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/GetCurrent接口异常:" + e);

      }

    });
    return false;
  }


  fireReset(url, DataId) {
    var isdear=false;
    let loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000,

    });
    loader.present();
    var remote = {
      time: 10,
      success: true,



      MAX_WAIT_TIME: 10
    };
    var sock = null;

    function doSend(bytes) {
      var buffer = new ArrayBuffer(bytes.length);
      var view = new DataView(buffer);
      view.setUint8(0, bytes.length);
      for (var i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
      }
      sock.send(view);
    };

    function processArrayBuffer(data) {

      var result = new Uint8Array(data);
      if (result.length == 1) {
        if (result[0] == 1) {
          remote.success = true;

          const m = document.createElement('div');
          m.innerHTML = "网关正忙，请稍后再试";
          m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
          }, 2000);

        } else if (result[0] == 2) {
          remote.success = true;
         const m = document.createElement('div');
          m.innerHTML = "网关不在线，请稍后再试！";
          m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
          }, 2000);
        }
      } else if (result.length == 21) {
        remote.success = true;
        const m = document.createElement('div');
        m.innerHTML = "操作成功!";
        m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function() {
          var d = 0.5;
          m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
          m.style.opacity = '0';
          setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, 2000);
      } else {
        remote.success = true;
        const m = document.createElement('div');
        m.innerHTML = "通讯失败";
        m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function() {
          var d = 0.5;
          m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
          m.style.opacity = '0';
          setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, 2000);
      }
      sock.close();

    }
    var loginMark = window.localStorage.getItem('loginMark');
    var token = window.localStorage.getItem('token');
    console.log(loginMark)
    var param = {
      "loginMark": loginMark,
      "token": token,
      "data": "{'keyValue':'" + DataId + "'} "
    }
    console.log(param)

    $.post(url,
      param,
      function (data) {
        console.log(data)
        //ws://122.228.89.215:8182
        sock = new WebSocket("ws://122.228.89.215:8182");
        var cmd = [];

        JSON.parse(data.data.Content).Cmd.split('-').forEach(function (data, index, arr) {
          cmd.push(parseInt(data, 16));
        })

        sock.binaryType = "arraybuffer"
        if ("WebSocket" in window) {
          sock.onopen = function () {
            console.log('send', cmd)
            doSend(cmd);
          };
          sock.onmessage = function (evt) {
            isdear=true
            loader.dismiss();
            console.log('recv', evt.data)
            if (evt.data instanceof ArrayBuffer) { // 处理字节信息
              processArrayBuffer(evt.data);

            } else {
              // processText(evt.data); // 处理文本信息
            }
          };
          sock.onclose = function () {
            console.log('复位命令已关闭');

          };
          sock.onerror = function (data) {

            console.log('onerror', data);
          }
        } else {
      
          const m = document.createElement('div');
          m.innerHTML = "您的设备不支持 WebSocket！无法使用远程上传与下载功能！";
          m.style.cssText="max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
          }, 2000);

        }

        console.log(data.data)

      });
      this.myInterval = setInterval(() => {
        console.log(isdear)
        if(isdear==false){
          const toast = super.showToast(this.toastCtrl, "通讯超时" , );
        }
        clearInterval(this.myInterval);
      }, 11000);
  }
  presentConfirm(message, url, DataId) {
    let alert = this.alertCtrl.create({
      title: '提示',
      cssClass:'headChoice',
      message: message,
      buttons: [{
          text: '否',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            this.fireReset(url, DataId);
          }
        }
      ]
    });
    alert.present();
  }
  kai(item) {
    var DataId1 = item.DataId;
    var url1 = this.url + "/TimedTask/GetSwitchOpenCmd";
    var message1 = "是否进行合闸操作？"
    this.presentConfirm(message1, url1, DataId1);


  }
  guan(item) {
    var DataId = item.DataId;
    var url = this.url + "/TimedTask/GetSwitchCloseCmd";
    var message = "是否进行分闸操作？"
    this.presentConfirm(message, url, DataId);

  }
  historical(item) {
    this.navCtrl.push(HistoricalPage, {
      DataId: item.DataId,
    })
  }
}
