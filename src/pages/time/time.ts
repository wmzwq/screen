import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { TimingPage } from '../timing/timing';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the TimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage extends BaseUI{
  loginMark: string;
  token: string;
  dataId: string;

 start:any;
end:any;
check:any;
  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider,public toastCtrl: ToastController) {
    super();
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.dataId=this.navParams.data.DataId;
    this.check=false
    this.url=window.localStorage.getItem('url');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');
  }
  first(){
    if(document.getElementById("first").className =="uncheck"){
      document.getElementById("first").className = "checked";
      
    }
    else{
      document.getElementById("first").className = "uncheck";
      
    }
  }
  second(){
    if(document.getElementById("second").className =="uncheck"){
      document.getElementById("second").className = "checked";
   
    }
    else{
      document.getElementById("second").className = "uncheck";

    }
  }
  third(){
    if(document.getElementById("third").className =="uncheck"){
      document.getElementById("third").className = "checked";
    
    }
    else{
      document.getElementById("third").className = "uncheck";
      
    }
  }
  fourth(){
    if(document.getElementById("fourth").className =="uncheck"){
      document.getElementById("fourth").className = "checked";
      

    }
    else{
      document.getElementById("fourth").className = "uncheck";
  
    }
  }
  fifth(){
    if(document.getElementById("fifth").className =="uncheck"){
      document.getElementById("fifth").className = "checked";

    }
    else{
      document.getElementById("fifth").className = "uncheck";
    
    }
  }
  sixth(){
    if(document.getElementById("sixth").className =="uncheck"){
      document.getElementById("sixth").className = "checked";
   
    }
    else{
      document.getElementById("sixth").className = "uncheck";
     
    }
  }
  seventh(){
   
    if(document.getElementById("seventh").className =="uncheck"){
      document.getElementById("seventh").className = "checked";
     
    }
    else{
      document.getElementById("seventh").className = "uncheck";
  
    }
  }
  new( ){

 
    var start=this.start
    var end=this.end
    
    var EnabledMark,Monday ,Tuesday,Wednesday,Thursday,Friday ,Saturday ,Sunday;
    if(this.check==true){
      EnabledMark=1;
    }
    else{
      EnabledMark=0;
    }
    if(document.getElementById("first").className =="uncheck"){
      Monday=false
    }
    else{
      Monday=true
    }
    if(document.getElementById("second").className =="uncheck"){
      Tuesday=false
    }
    else{
      Tuesday=true
    }
    if(document.getElementById("third").className =="uncheck"){
      Wednesday=false
    }
    else{
      Wednesday=true
    }
    if(document.getElementById("fourth").className =="uncheck"){
      Thursday=false
    }
    else{
      Thursday=true
    }
    if(document.getElementById("fifth").className =="uncheck"){
      Friday=false
    }
    else{
      Friday=true
    }
    if(document.getElementById("sixth").className =="uncheck"){
      Saturday=false
    }
    else{
      Saturday=true
    }
    if(document.getElementById("seventh").className =="uncheck"){
      Sunday=false
    }
    else{
      Sunday=true
    }
    
    console.log(EnabledMark)
    
    var url=this.url+"/TimedTask/SaveForm";
  
  this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'keyValue':'','strEntity':\"{'F_DataId':'"+this.dataId+"','F_StartTime':'"+start+"','F_EndTime':'"+end+"','F_Monday':"+Monday+",'F_Tuesday':"+Tuesday+",'F_Wednesday':"+Wednesday+",'F_Thursday':"+Thursday+",'F_Friday':"+Friday+",'F_Saturday':"+Saturday+",'F_Sunday':"+Sunday+",'F_EnabledMark':"+EnabledMark+"}\"} "
  }) ).then(res=>{
try {
  const toast = super.showToast(this.toastCtrl, res.info, ); 
   console.log(res)
} catch (error) {
  const toast = super.showToast(this.toastCtrl, "/TimedTask/SaveForm接口异常:"+error, ); 

}
 
  
  });
  }
  back(){
    this.navCtrl.push(TimingPage,{
      DataId:this.dataId
    })
  }
}
