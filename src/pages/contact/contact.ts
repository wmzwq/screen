import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  NavController,
  LoadingController,
  ModalController,
  ToastController,
  Platform,
  IonicApp
} from 'ionic-angular';
import {
  HttpSerProvider
} from '../../app/http-serve';
import * as echarts from 'echarts';
import {
  DevicePage
} from '../device/device';
import {
  HistoryFaultPage
} from '../history-fault/history-fault';
import {
  Network
} from '@ionic-native/network';
import {
  BaseUI
} from '../../app/baseui';
import {
  LoginPage
} from '../login/login';
import {
  SettingPage
} from '../setting/setting';
import {
  PasswordPage
} from '../password/password';
import {
  APP_SERVE_URL
} from '../../app/Constants';
import {
  NativeAudio
} from '@ionic-native/native-audio';
import $ from 'jquery';
import {
  NativeService
} from '../../providers/NativeService ';
import {
  WifePage
} from '../wife/wife';
import {
  InAppBrowser
} from '@ionic-native/in-app-browser';
import {
  AppAvailability
} from '@ionic-native/app-availability';
import {
  File,
  FileEntry
} from '@ionic-native/file';
import { AppVersion } from '@ionic-native/app-version';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage extends BaseUI {
  loginMark: string;
  token: string;
  dataId: string;
  @ViewChild('chart') chart: ElementRef;
  now: string;
  month: string | number;
  two: string;
  dataX: any[];
  dataAY: any;
  dataBY: any;
  dataCY: any;
  EquipmentFault: any;
  faultList: any;
  id: any;
  notifications: any;
  transformerRoom: any;
  equip: any;
  EquipmentList: any;
  dataDY: any;
  url: string;
  public myInterval: any; // 定时器
  protectDay: any;
  wsurl: string;
  name: any;


  private onSuccess: any;
  private onError: any;
  tooltips: any;
  ss: any;
  roomId: any;
  ssInterval: number;
  F_UserId: any;
  version: any;

  constructor(public navCtrl: NavController, private httpservice: HttpSerProvider, public network: Network, private loadingCtrl: LoadingController, public modalCtrl: ModalController, public toastCtrl: ToastController, public nativeAudio: NativeAudio, private iab: InAppBrowser,
    private appAvailability: AppAvailability, private file: File, private nativeService: NativeService, private ionicApp: IonicApp,
    private platform: Platform,private appVersion: AppVersion,) {
    super();
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/lib/gz.mp3').then(this.onSuccess, this.onError)
    if (window.localStorage.getItem('refresh') != null) {
      var time = window.localStorage.getItem('refresh')
      this.ss = parseInt(time) * 1000
    } else {
      this.ss = 60000
    }
    this.myInterval = setInterval(() => {
      this.nativeService.detectionUpgrade()
      this.nativeService.GetPageListAPP()
      clearInterval(this.ssInterval);
      this.customer();
      this.faultNumber();
      this.fault();
      if (this.network.type == 'none') {
        console.log("1")
        const modal = this.modalCtrl.create(WifePage);
        modal.present();
      }
      let activeModal = this.ionicApp._modalPortal.getActive();
      if (activeModal) {
        console.log("model is openning");
        activeModal.dismiss();
      }
    }, this.ss);
    if (window.localStorage.getItem('url') && window.localStorage.getItem('wsurl')) {
      this.url = window.localStorage.getItem('url');
      this.wsurl = window.localStorage.getItem('wsurl');
    } else {
      clearInterval(this.myInterval);
      const toast = super.showToast(this.toastCtrl, "请设置接口访问地址");
      const modal = this.modalCtrl.create(PasswordPage);
      modal.present();
      // this.url="http://122.228.89.215:8897";
    }
    console.log(this.loginMark)
    console.log(this.token)

    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      this.month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;

    };
    this.now = formatDate(new Date().getTime()); // 当前时间
    this.two = formatDate(new Date().getTime() + (1000 * 3600 * 24 * (1)))
    this.tooltips = true
    this.customer();
    this.faultNumber();
    this.fault();
   

  }
  ionViewDidLoad() {

  }
 
  electricity() {

    var _that = this;
    var url = this.url + "/RelevanceStatistics/DataFifteen";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'dataId':'" + this.equip + "','dateStart':'" + this.now + "','dateStop':'" + this.two + "'} "
    })).then(res => {
      try {
        console.log("用电", res)
        var CurveData = res.data

        var dataLength = CurveData[1].BaseContents.length; //获取曲线标题
        var dataXLength = CurveData[1].DataX.length; //时间显示去掉日期
        this.dataX = new Array(dataXLength);
        for (var i = 0; i < dataXLength; i++) {
          this.dataX[i] = CurveData[1].DataX[i].split(' ')[1].slice(0, 5);
        }
        this.dataAY = CurveData[1].BaseContents[0].DataY;
        this.dataBY = CurveData[1].BaseContents[1].DataY;
        this.dataCY = CurveData[1].BaseContents[2].DataY;
        var arr= CurveData[2].BaseContents[0].DataY;
        this.dataDY=new Array()
        for(i=0;i<arr.length;i++){
          this.dataDY.push(Number(arr[i])/1000)
        }
        console.log("剩余",this.dataDY)
        console.log(this.dataX)
        
        this.clickChart2();
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/DataFifteen接口异常:" + e);

      }

    });
  }
  clickChart2() {
    const ec = echarts as any;
    var myChart = ec.init(document.getElementById('chart'));

    var option = {
      backgroundColor: '',
      legend: {
        data: ['A相电流', 'B相电流', 'C相电流', '剩余电流'],
        tooltip: {
          show: true
        },
        textStyle: { //图例文字的样式
          color: '#FFFFFF',

        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#315070'],
            width: 1,
            type: 'solid'
          }
        },
        boundaryGap: false,
        data: this.dataX, //加载曲线x值
        axisLabel: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(12,102,173,.5)',
            width: 2,
          }
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 60,
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#315070'],
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          color: '#fff',
          formatter: '{value} ' + "A" //单位
        },
        axisTick: {
          show: false, //不显示刻度线
        },

        axisLine: {
          lineStyle: {
            width: 2,
            color: 'rgba(12,102,173,.5)', //y轴的轴线的宽度和颜色
          }
        },

      },
      series: [{
          name: 'A相电流',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataAY,
          itemStyle: {
            normal: {
              color: '#FFA500',
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFA500'
              }, {
                offset: 1,
                color: 'rgba(12,102,173,.5)'
              }])
            }
          },
        },
        {
          name: 'B相电流',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataBY,
          itemStyle: {
            normal: {
              color: '#09b0f5',
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#09b0f5'
              }, {
                offset: 1,
                color: 'rgba(12,102,173,.5)'
              }])
            }
          },
        },
        {
          name: 'C相电流',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataCY,
          itemStyle: {
            normal: {
              color: '#800080',
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#800080'
              }, {
                offset: 1,
                color: 'rgba(12,102,173,.5)'
              }])
            }
          },
        },
        {
          name: '剩余电流',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataDY,
          itemStyle: {
            normal: {
              color: '	#DC143C',
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#DC143C'
              }, {
                offset: 1,
                color: 'rgba(12,102,173,.5)'
              }])
            }
          },
        }
      ]
    };

    myChart.setOption(option);



  }
  faultNumber() {
    var _that = this;
    var url = this.url + "/RelevanceStatistics/TenementGetFault";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:2000,page: 1,sidx:'Treturntime',sord:'ASC'},'queryJson':'{Talarmstatus:1}'} "
    })).then(res => {
      try {
        if (res.code == 401) {
          const toast = super.showToast(this.toastCtrl, '当前登录信息已失效，请重新登录');
          clearInterval(this.myInterval);
          this.navCtrl.setRoot(LoginPage)
        }
        console.log("故障数量", res)

        this.EquipmentFault = res.data.rows.length
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/TenementGetFault接口异常:" + e, );


      }



    });
  }
  fault() {
    var _that = this;
    var url = this.url + "/RelevanceStatistics/TenementGetFault";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:3,page: 1,sidx:'',sord:'ASC'},'queryJson':'{Talarmstatus:1}'} "
    })).then(res => {
      try {
        this.faultList = res.data.rows
        if (res.data.rows.length == 0) {
          var mychar1 = document.getElementById('default');
          var mychar2 = document.getElementById('faultTitle');
          var mychar3 = document.getElementById('animated');
          $(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
          mychar1.style.display = "block";
          mychar2.style.display = "none";
          mychar3.style.display = "none";
          this.tooltips = false
        }
        if (res.data.rows.length > 0) {
          console.log(1)
          this.animation()
        }
       
          if (this.tooltips == true) {
            console.log("聲音")
          this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
        
         
        }
        console.log("故障", res)
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/TenementGetFault接口异常:" + e, );
      }


    });
  }
  godecic() {
    clearInterval(this.myInterval);
    clearInterval(this.myInterval);
    this.navCtrl.setRoot(DevicePage)
  }
  gohistory() {
    clearInterval(this.myInterval);
    clearInterval(this.myInterval);
    this.navCtrl.setRoot(HistoryFaultPage)
  }

  customer() {

    var url = this.url + "/RelevanceStatistics/WyCustomesInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,

    })).then(res => {
      try {
        console.log("客户", res)
        let sTime = new Date(this.now).getTime();
        let ss = res.data.Bus_CustomInfoData.F_InstallDate.slice(0, 10)
        let eTime = new Date(ss).getTime();
        let reduceDate = (sTime - eTime) / 1000 / 60 / 60 / 24;
        this.protectDay = reduceDate;
        this.id = res.data.Bus_CustomInfoData.F_Id;
        this.name = res.data.Bus_CustomInfoData.F_FullName;

        this.transformer();
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/WyCustomesInfo接口异常:" + e, );
      }

    });
  }
  transformer() {


    var url = this.url + "/RelevanceStatistics/RoomInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'keyValue':'" + this.id + "'} "
    })).then(res => {
      try {
        console.log("配电室", res.data)
        this.transformerRoom = res.data
        if (window.localStorage.getItem('notifications') != null) {
          this.notifications = window.localStorage.getItem('notifications')
          console.log(this.notifications)

        } else {
          this.notifications = res.data[0].F_Id
          window.localStorage.setItem('notifications', this.notifications);
        }

        this.equipment();
      } catch (e) {

        const toast = this.toastCtrl.create({
          message: "/RelevanceStatistics/RoomInfo接口异常:" + e,
          duration: 3000
        });
        toast.present();
      }

    });


  }

  equipment() {


    var url = this.url + "/RelevanceStatistics/FacilityInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'keyValue':'" + this.notifications + "'} "
    })).then(res => {
      try {
        console.log("设备", res.data)
        this.EquipmentList = res.data
        if (window.localStorage.getItem('equip') != null) {
          this.equip = window.localStorage.getItem('equip')

        } else {
          this.equip = res.data[0].DataId
          window.localStorage.setItem('equip', this.equip);
        }


        this.electricity();
      } catch (e) {

        const toast = this.toastCtrl.create({
          message: "/RelevanceStatistics/FacilityInfo接口异常:" + e,
          duration: 3000
        });
        toast.present();
      }


    });

  }
  segmentChanged() {
    window.localStorage.setItem('notifications', this.notifications);
    var url = this.url + "/RelevanceStatistics/FacilityInfo";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'keyValue':'" + this.notifications + "'} "
    })).then(res => {
      try {
        console.log(res)
        this.EquipmentList = res.data
        this.equip = res.data[0].DataId
        window.localStorage.setItem('equip', this.equip);
        console.log("设备", res.data)
        this.electricity();
      } catch (e) {

        const toast = this.toastCtrl.create({
          message: "/RelevanceStatistics/FacilityInfo接口异常:" + e,
          duration: 3000
        });
        toast.present();
      }


    });

  }
  equipChanged() {

    window.localStorage.setItem('equip', this.equip);
    this.electricity();

  }
  goSet() {
    clearInterval(this.myInterval);
    clearInterval(this.ssInterval);
    this.navCtrl.setRoot(SettingPage)
  }
  prompt() {

    var mychar1 = document.getElementById('prompt');
    var mychar2 = document.getElementById('tooltips');
    if (mychar1.style.display == "block" || mychar1.style.display == "") {
      mychar1.style.display = "none";
      mychar2.style.display = "block";
      this.tooltips = false
      const toast = super.showToast(this.toastCtrl, "声音提示已关闭", );
    } else {
      mychar1.style.display = "block";
      mychar2.style.display = "none";
      this.tooltips = true
      const toast = super.showToast(this.toastCtrl, "声音提示已开启", );

    }
  }
  doRefresh(refresher) {

    console.log("下拉刷新");
    clearInterval(this.myInterval);
    this.customer();
    this.faultNumber();
    this.fault();
    if (this.network.type == 'none') {
      let loader = this.loadingCtrl.create({
        content: "当前网络不可用，请检查网络设置！"
      });
      loader.present();
      setTimeout(() => {
        loader.dismiss()
      }, 5000)
    }
    setTimeout(() => {
      console.log('加载完成后，关闭刷新');
      refresher.complete();
      const toast = super.showToast(this.toastCtrl, '加载成功');


    }, 2000);
  }

  animation() {

    this.ssInterval = setInterval(function () {
      if ($(".animated-circles").hasClass("animated")) {
        $(".animated-circles").removeClass("animated");
      } else {
        $(".animated-circles").addClass('animated');
      }
    }, 3000);
    // var wait = setInterval(function() {
    //   $(".livechat-hint").removeClass("hide_hint").addClass("show_hint");
    //   clearInterval(wait);
    // }, 4500);
    // $(".livechat-girl").hover(function() { 
    //   clearInterval(wait);
    //   $(".livechat-hint").removeClass("show_hint").addClass("hide_hint");
    // }, function() {
    //   $(".livechat-hint").removeClass("hide_hint").addClass("show_hint");
    // }).click(function() {

    // });
  }


}
