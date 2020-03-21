import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  selector: 'page-time-edit',
  templateUrl: 'time-edit.html',
})
export class TimeEditPage extends BaseUI{
  loginMark: string;
  token: string;
  dataId: string;

 start:any;
end:any;
check:any;
  F_Id: string;
  F_StartTime: any;
  F_EndTime: any;
  F_Monday: any;
  F_Saturday: any;
  F_Thursday: any;
  F_Tuesday: any;
  F_Wednesday: any;
  F_Friday: any;
  F_Sunday: any;
  F_EnabledMark: any;
  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpservice: HttpSerProvider,private alertCtrl:AlertController,public toastCtrl: ToastController) {
    super();
    this.loginMark=window.localStorage.getItem('loginMark');
    this.token=window.localStorage.getItem('token');
    this.F_Id=this.navParams.data.F_Id;
    this.dataId=this.navParams.data.F_DataId;
    this.F_StartTime=this.navParams.data.F_StartTime;
    this.F_EndTime=this.navParams.data.F_EndTime;
    this.F_Monday=this.navParams.data.F_Monday;
    this.F_Saturday=this.navParams.data.F_Saturday;
    this.F_Thursday=this.navParams.data.F_Thursday;
    this.F_Tuesday=this.navParams.data.F_Tuesday;
    this.F_Wednesday=this.navParams.data.F_Wednesday;
    this.F_Friday=this.navParams.data.F_Friday;
    this.F_Sunday=this.navParams.data.F_Sunday;
    this.F_EnabledMark=this.navParams.data.F_EnabledMark;
    this.start=this.F_StartTime;
    this.end=this.F_EndTime;
    this.url=window.localStorage.getItem('url');
    
    
  }

  ionViewDidLoad() {
    if(this.F_EnabledMark==1){
      this.check=true
    }
    else{
      this.check=false
    }
    if( this.F_Monday==true){
      document.getElementById("one").className = "checked";
    }
    else{
      document.getElementById("one").className =="uncheck"
    }
    if( this.F_Tuesday==true){
      document.getElementById("two").className = "checked";
    }
    else{
      document.getElementById("two").className =="uncheck"
    }
    if( this.F_Wednesday==true){
      document.getElementById("three").className = "checked";
    }
    else{
      document.getElementById("three").className =="uncheck"
    }
    
    if( this.F_Thursday==true){
      document.getElementById("four").className = "checked";
    }
    else{
      document.getElementById("four").className =="uncheck"
    }
    
    if( this.F_Friday==true){
      document.getElementById("five").className = "checked";
    }
    else{
      document.getElementById("five").className =="uncheck"
    }
    
    if( this.F_Saturday==true){
      document.getElementById("six").className = "checked";
    }
    else{
      document.getElementById("six").className =="uncheck"
    }
    
    if( this.F_Sunday==true){
      document.getElementById("seven").className = "checked";
    }
    else{
      document.getElementById("seven").className =="uncheck"
    }
    console.log('ionViewDidLoad TimePage');
  }
  one(){
    if(document.getElementById("one").className =="uncheck"){
      document.getElementById("one").className = "checked";
      
    }
    else{
      document.getElementById("one").className = "uncheck";
      
    }
  }
  two(){
    if(document.getElementById("two").className =="uncheck"){
      document.getElementById("two").className = "checked";
   
    }
    else{
      document.getElementById("two").className = "uncheck";

    }
  }
  three(){
    if(document.getElementById("three").className =="uncheck"){
      document.getElementById("three").className = "checked";
    
    }
    else{
      document.getElementById("three").className = "uncheck";
      
    }
  }
  four(){
    if(document.getElementById("four").className =="uncheck"){
      document.getElementById("four").className = "checked";
      

    }
    else{
      document.getElementById("four").className = "uncheck";
  
    }
  }
  five(){
    if(document.getElementById("five").className =="uncheck"){
      document.getElementById("five").className = "checked";

    }
    else{
      document.getElementById("five").className = "uncheck";
    
    }
  }
  six(){
    if(document.getElementById("six").className =="uncheck"){
      document.getElementById("six").className = "checked";
   
    }
    else{
      document.getElementById("six").className = "uncheck";
     
    }
  }
  seven(){
   
    if(document.getElementById("seven").className =="uncheck"){
      document.getElementById("seven").className = "checked";
     
    }
    else{
      document.getElementById("seven").className = "uncheck";
  
    }
  }
  edit( ){

 
    var start=this.start
    var end=this.end
    
    var EnabledMark,Monday ,Tuesday,Wednesday,Thursday,Friday ,Saturday ,Sunday;
    if(this.check==true){
      EnabledMark=1;
    }
    else{
      EnabledMark=0;
    }
    if(document.getElementById("one").className =="uncheck"){
      Monday=false
    }
    else{
      Monday=true
    }
    if(document.getElementById("two").className =="uncheck"){
      Tuesday=false
    }
    else{
      Tuesday=true
    }
    if(document.getElementById("three").className =="uncheck"){
      Wednesday=false
    }
    else{
      Wednesday=true
    }
    if(document.getElementById("four").className =="uncheck"){
      Thursday=false
    }
    else{
      Thursday=true
    }
    if(document.getElementById("five").className =="uncheck"){
      Friday=false
    }
    else{
      Friday=true
    }
    if(document.getElementById("six").className =="uncheck"){
      Saturday=false
    }
    else{
      Saturday=true
    }
    if(document.getElementById("seven").className =="uncheck"){
      Sunday=false
    }
    else{
      Sunday=true
    }
    console.log(start)
    console.log(Sunday)
    console.log(EnabledMark)
  
    var url=this.url+"/TimedTask/SaveForm";
  
  this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'keyValue':'"+this.F_Id+"','strEntity':\"{'F_DataId':'"+this.dataId+"','F_StartTime':'"+start+"','F_EndTime':'"+end+"','F_Monday':"+Monday+",'F_Tuesday':"+Tuesday+",'F_Wednesday':"+Wednesday+",'F_Thursday':"+Thursday+",'F_Friday':"+Friday+",'F_Saturday':"+Saturday+",'F_Sunday':"+Sunday+",'F_EnabledMark':"+EnabledMark+"}\"} "
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
  presentConfirm(){
    var url=this.url+"/TimedTask/DeleteTask"
  this.httpservice.post(url, JSON.stringify({
    "loginMark":this.loginMark,
      "token":this.token,
      "data": "{'keyValue':'"+this.F_Id+"'} "
  }) ).then(res=>{
 try {
  const toast = super.showToast(this.toastCtrl, res.info ); 
  
   this.navCtrl.push(TimingPage,{
    DataId:this.dataId
  })
   console.log(res)
 } catch (error) {
  const toast = super.showToast(this.toastCtrl, "/TimedTask/DeleteTask接口异常:"+error ); 

 }
    
  
  });
  }
  delete() {
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '是否删除该定时任务',
      buttons: [
        {
          text: '否',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            this.presentConfirm();
          }
        }
      ]
    });
    alert.present();
  }
}
