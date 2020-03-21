import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpSerProvider } from './http-serve';
import { TimingPage } from '../pages/timing/timing';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPage } from '../pages/login/login';
import { TimePage } from '../pages/time/time';
import { TimeEditPage } from '../pages/time-edit/time-edit';
import { DevicePage } from '../pages/device/device';
import { HistoryFaultPage } from '../pages/history-fault/history-fault';
import { WebSocketServiceProvider } from './web-socket-service';
import {Network} from "@ionic-native/network";
import { SettingPage } from '../pages/setting/setting';
import { HistoricalPage } from '../pages/historical/historical';
import { UrlPage } from '../pages/url/url';
import { PasswordPage } from '../pages/password/password';
import { NativeAudio } from '@ionic-native/native-audio';
import { AppVersion } from '@ionic-native/app-version';
import { File } from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeService } from '../providers/NativeService ';
import { WifePage } from '../pages/wife/wife';
import { AppAvailability } from '@ionic-native/app-availability';
@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    LoginPage,
    TimingPage,
    TimePage,
    TimeEditPage,
    DevicePage,
    HistoryFaultPage,
    SettingPage,
    HistoricalPage,
    UrlPage,
    PasswordPage,
    WifePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      // mode:'ios',
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '' /*配置返回按钮*/
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    LoginPage,
    TimingPage,
    TimePage,
    TimeEditPage,
    DevicePage,
    HistoryFaultPage,
    SettingPage,
    HistoricalPage,
    UrlPage,
    PasswordPage,
    WifePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpSerProvider,
    ScreenOrientation,
    WebSocketServiceProvider,
    Network,
    NativeAudio,
    AppVersion,
    File ,
    FileTransfer,
    FileTransferObject,
    FileOpener,
    InAppBrowser,
    NativeService,
    AppAvailability,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  
  ]
})
export class AppModule {}
