import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  HttpSerProvider
} from '../../app/http-serve';
import {
  ContactPage
} from '../contact/contact';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the HistoryFaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-fault',
  templateUrl: 'history-fault.html',
})
export class HistoryFaultPage extends BaseUI {
  loginMark: string;
  token: string;
  faultList: any;
  url: string;
  start: any;
  end: any;
  month: any;
  starTime: any;
  endTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider, public loadCtrl: LoadingController, public toastCtrl: ToastController) {
    super();
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.url = window.localStorage.getItem('url');
    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      this.month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;


    };
   
    this.end = formatDate(new Date().getTime()); // 当前时间
    this.start= formatDate(new Date().getTime() + (1000 * 3600 * 24 * (-90)))
    this.starTime=this.start+' '+"00:00:00";
    this.endTime=this.end+' '+"23:59:59";
    this.fault()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryFaultPage');
  }
  fault() {
    console.log(this.starTime)
    console.log(this.endTime)
    var loader = this.loadCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000,
  
    });
    loader.present();
    var _that = this;
    var url = this.url + "/RelevanceStatistics/TenementGetFault";
    this.httpservice.post(url, JSON.stringify({
      "loginMark": this.loginMark,
      "token": this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'Treturntime',sord:'ASC'},'queryJson':\"{'StartTime':'" +this.starTime + "','EndTime':'" + this. endTime + "'}\"} "
    })).then(res => {
      try {
        console.log(res)
        this.faultList = res.data.rows
        console.log("故障", this.faultList)
        loader.dismiss()
      } catch (error) {
        loader.dismiss()
        const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/TenementGetFault接口异常:" + error, );

      }


    });
  }
  back() {
    this.navCtrl.push(ContactPage)
  }
  query(){
    this.starTime=this.start+' '+"00:00:00";
    this.endTime=this.end+' '+"23:59:59";
    this.fault()
   
  }
  startChanged() {
    let sTime = new Date(this.start).getTime();

    let eTime = new Date(this.end).getTime();

    let reduceDate = (eTime - sTime) / 1000 / 60 / 60 / 24;
    if (sTime > eTime) {
      const toast = super.showToast(this.toastCtrl, '开始日期不能大于结束日期！');


    } 
    else if (reduceDate > 90) {
      const toast = super.showToast(this.toastCtrl, '时间相隔不能超过三个月');
    } 
  }
  endChanged() {
    let sTime = new Date(this.start).getTime();

    let eTime = new Date(this.end).getTime();

    let reduceDate = (eTime - sTime) / 1000 / 60 / 60 / 24;
    if (sTime > eTime) {
      const toast = super.showToast(this.toastCtrl, '结束日期不能小于开始日期');
    } else if (reduceDate > 90) {
      const toast = super.showToast(this.toastCtrl, '时间相隔不能超过三个月');
    } 

  }
}
