import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpSerProvider } from '../../app/http-serve';
import { TimePage } from '../time/time';
import { TimeEditPage } from '../time-edit/time-edit';
import { ContactPage } from '../contact/contact';
import { DevicePage } from '../device/device';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the TimingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timing',
  templateUrl: 'timing.html',
})
export class TimingPage extends BaseUI{
  loginMark: string;
  token: string;
  dataId: string;
  timeList: any;
  startTime: any;
  arr: any[];
  F_Id: any;
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider,public toastCtrl: ToastController) {
    super();
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.F_Id=this.navParams.data.F_Id;
    this.dataId=this.navParams.data.DataId;
    this.url=window.localStorage.getItem('url');
    
    this.timelist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimingPage');
  }
  
time(){
  
    var _that=this;
    var url=this.url+"/TimedTask/SaveForm";
  this.httpservice.post(url, JSON.stringify({
      "loginMark":this.loginMark,
        "token":this.token,
        "data": "{'keyValue':'"+this.dataId+"'} "
    })).then(res=>{
    try {
      console.log("合闸",res)
    } catch (error) {
      const toast = super.showToast(this.toastCtrl, "/TimedTask/SaveForm接口异常:"+error, );
    
    }
  
  
  });
  
}
timelist(){
  var _that=this;
  var url=this.url+"/TimedTask/GetList";
this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'F_DataId':'"+this.dataId+"'}\"} "
  })).then(res=>{
    try {
      this.timeList=res.data.rows
      console.log(this.timeList)
       this.arr=new Array();
           var dataLength = this.timeList.length
            for(var i=0;i<dataLength ;i++){
          var  temp={"F_StartTime":this.timeList[i]["F_StartTime"].split(' ')[1].slice(0, 5),"F_EndTime":this.timeList[i]["F_EndTime"].split(' ')[1].slice(0, 5),
          "F_Monday":this.timeList[i]["F_Monday"],"F_Saturday":this.timeList[i]["F_Saturday"],"F_Sunday":this.timeList[i]["F_Sunday"],"F_Thursday":this.timeList[i]["F_Thursday"],
          "F_Tuesday":this.timeList[i]["F_Tuesday"],"F_Wednesday":this.timeList[i]["F_Wednesday"],"F_Friday":this.timeList[i]["F_Friday"],"F_EnabledMark":this.timeList[i]["F_EnabledMark"],
          "F_Id":this.timeList[i]["F_Id"],"F_DataId":this.timeList[i]["F_DataId"]};
          this.arr.push(temp)
          
           
        }
        console.log(this.arr)
    } catch (error) {
      const toast = super.showToast(this.toastCtrl, "/TimedTask/GetList接口异常:"+error, );
     
    }
   


});
}
new(){
  this.navCtrl.setRoot(TimePage,{
    DataId:this.dataId
  })
}
edit(item){
  this.navCtrl.setRoot(TimeEditPage,{
    F_StartTime:item.F_StartTime,
    F_EndTime:item.F_EndTime,
    F_Monday:item.F_Monday,
    F_Saturday:item.F_Saturday,
    F_Thursday:item.F_Thursday,
    F_Tuesday:item.F_Tuesday,
    F_Wednesday:item.F_Wednesday,
    F_Friday:item.F_Friday,
    F_Sunday:item.F_Sunday,
    F_EnabledMark:item.F_EnabledMark,
    F_Id:item.F_Id,
    F_DataId:item.F_DataId
  })
}
back(){
  this.navCtrl.push(DevicePage)
}

}
