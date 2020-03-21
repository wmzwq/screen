import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {
  HttpSerProvider
} from '../../app/http-serve';
import {
  DevicePage
} from '../device/device';
import {
  BaseUI
} from '../../app/baseui';
/**
 * Generated class for the HistoricalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historical',
  templateUrl: 'historical.html',
})
export class HistoricalPage extends BaseUI {
  notifications: string;
  token: string;
  loginMark: string;
  dataId: any;
  start: string;
  end: string;

  month: string | number;
  dataX: any;
  dataAY: any;
  dataCY: any;
  dataBY: any;
  nameA: any;
  nameB: any;
  nameC: any;
  unit: any;
  dataLength: any;
  nameN: any;
  dataNY: any;
  chart: any;
  max: any;
  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider, public toastCtrl: ToastController) {
    super();
    this.loginMark = window.localStorage.getItem('loginMark');
    this.token = window.localStorage.getItem('token');
    this.notifications = "电流";
    this.dataId = this.navParams.data.DataId;
    this.url = window.localStorage.getItem('url');


    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      this.month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;


    };
    this.start = formatDate(new Date().getTime()); // 当前时间

    this.end = formatDate(new Date().getTime() + (1000 * 3600 * 24 * (1)))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricalPage');
  }
  ionViewDidEnter() {
    this.electricity();
  }
  electricity() {

    if (this.start == undefined || this.end == undefined) {
      const toast = super.showToast(this.toastCtrl, '日期不能为空！');

    } else {
      var url = this.url + "/RelevanceStatistics/DataFifteen";
      this.httpservice.post(url, JSON.stringify({
        "loginMark": this.loginMark,
        "token": this.token,
        "data": "{'dataId':'" + this.dataId + "','dateStart':'" + this.start + "','dateStop':'" + this.end + "'} "
      })).then(res => {
        try {
          console.log(res)
          var CurveData = res.data
          if (this.notifications == "电流") {
            this.dataLength = CurveData[1].BaseContents.length;
            this.nameA = CurveData[1].BaseContents[0].ListName;
            this.nameB = CurveData[1].BaseContents[1].ListName;
            this.nameC = CurveData[1].BaseContents[2].ListName;
            this.unit = CurveData[1].BaseContents[0].ListUnit;
            this.dataX = CurveData[1].DataX;
            this.dataAY = CurveData[1].BaseContents[0].DataY;
            this.dataBY = CurveData[1].BaseContents[1].DataY;
            this.dataCY = CurveData[1].BaseContents[2].DataY;
            console.log(this.dataX)
            this.clickChart2();
          }
          if (this.notifications == "温度") {
            this.dataLength = CurveData[0].BaseContents.length;
            this.nameA = CurveData[0].BaseContents[0].ListName;
            this.nameB = CurveData[0].BaseContents[1].ListName;
            this.nameC = CurveData[0].BaseContents[2].ListName;
            this.nameN = CurveData[0].BaseContents[3].ListName;
            this.unit = CurveData[0].BaseContents[0].ListUnit;
            this.dataX = CurveData[0].DataX;
            this.dataAY = CurveData[0].BaseContents[0].DataY;
            this.dataBY = CurveData[0].BaseContents[1].DataY;
            this.dataCY = CurveData[0].BaseContents[2].DataY;
            this.dataNY = CurveData[0].BaseContents[3].DataY;
            console.log(this.dataX)
            this.clickChart3();
          }
          if (this.notifications == "剩余电流") {
            this.dataLength = CurveData[2].BaseContents.length;
            this.nameA = CurveData[2].BaseContents[0].ListName;
            this.unit = CurveData[2].BaseContents[0].ListUnit;
            this.dataX = CurveData[2].DataX;
            this.dataAY = CurveData[2].BaseContents[0].DataY;
            console.log(this.dataX)
            console.log(this.max)
            this.clickChart1();
          }
          if (this.notifications == "相电压") {
            this.dataLength = CurveData[3].BaseContents.length;
            this.nameA = CurveData[3].BaseContents[0].ListName;
            this.nameB = CurveData[3].BaseContents[1].ListName;
            this.nameC = CurveData[3].BaseContents[2].ListName;
            this.unit = CurveData[3].BaseContents[0].ListUnit;
            this.dataX = CurveData[3].DataX;
            this.dataAY = CurveData[3].BaseContents[0].DataY;
            this.dataBY = CurveData[3].BaseContents[1].DataY;
            this.dataCY = CurveData[3].BaseContents[2].DataY;

            console.log(this.dataX)
            this.clickChart2();
          }
          if (this.notifications == "线电压") {
            this.dataLength = CurveData[4].BaseContents.length;
            this.nameA = CurveData[4].BaseContents[0].ListName;
            this.nameB = CurveData[4].BaseContents[1].ListName;
            this.nameC = CurveData[4].BaseContents[2].ListName;
            this.unit = CurveData[4].BaseContents[0].ListUnit;
            this.dataX = CurveData[4].DataX;
            this.dataAY = CurveData[4].BaseContents[0].DataY;
            this.dataBY = CurveData[4].BaseContents[1].DataY;
            this.dataCY = CurveData[4].BaseContents[2].DataY;

            console.log(this.dataX)
            this.clickChart2();
          }
          if (this.notifications == "有功功率") {
            this.dataLength = CurveData[5].BaseContents.length;
            this.nameA = CurveData[5].BaseContents[0].ListName;
            this.nameB = CurveData[5].BaseContents[1].ListName;
            this.nameC = CurveData[5].BaseContents[2].ListName;
            this.nameN = CurveData[5].BaseContents[3].ListName;
            this.unit = CurveData[5].BaseContents[0].ListUnit;
            this.dataX = CurveData[5].DataX;
            this.dataAY = CurveData[5].BaseContents[0].DataY;
            this.dataBY = CurveData[5].BaseContents[1].DataY;
            this.dataCY = CurveData[5].BaseContents[2].DataY;
            this.dataNY = CurveData[5].BaseContents[3].DataY;

            console.log(this.dataX)
            this.clickChart3();
          }
          if (this.notifications == "频率") {
            this.dataLength = CurveData[6].BaseContents.length;
            this.nameA = CurveData[6].BaseContents[0].ListName;
            this.unit = CurveData[6].BaseContents[0].ListUnit;
            this.dataX = CurveData[6].DataX;
            this.dataAY = CurveData[6].BaseContents[0].DataY;
            console.log(this.dataX)

            this.clickChart1();
          }
          if (this.notifications == "功率因素") {
            this.dataLength = CurveData[7].BaseContents.length;
            this.nameA = CurveData[7].BaseContents[0].ListName;
            this.unit = CurveData[7].BaseContents[0].ListUnit;
            this.dataX = CurveData[7].DataX;
            this.dataAY = CurveData[7].BaseContents[0].DataY;
            console.log(this.dataX)
            this.clickChart1();
          }
        } catch (error) {
          const toast = super.showToast(this.toastCtrl, "/RelevanceStatistics/DataFifteen接口异常:" + error);

        }


      });
    }

  }
  clickChart1() {
    const ec = echarts as any;
    var myChart = ec.init(document.getElementById('chart'));

    myChart.setOption({
      backgroundColor: '',
      legend: {
        data: [this.nameA],
        tooltip: {
          show: true
        },
        textStyle: { //图例文字的样式
          color: '#FFFFFF',

        }
      },
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          animation: false
        }
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
        axisLine: {
          lineStyle: {
            width: 2,
            color: 'rgba(12,102,173,.5)', //y轴的轴线的宽度和颜色
          }
        },
        data: this.dataX, //加载曲线x值
        axisLabel: {
          color: '#fff'
        },

      },
      yAxis: {
        type: 'value',

        scale: true,
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
          formatter: '{value} ' + this.unit //单位
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
          name: this.nameA,
          type: 'line',
          markLine: {
            silent: true,

          },
          data: this.dataAY,
          itemStyle: {
            normal: {
              color: '#FFA500',
            }
          },

        },

      ]
    }, true);


    document.getElementById('chart').removeAttribute("_echarts_instance_");


  }
  clickChart2() {
    const ec = echarts as any;
    var myChart = ec.init(document.getElementById('chart'));

    myChart.setOption({
      backgroundColor: '',
      legend: {
        data: [this.nameA, this.nameB, this.nameC],
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

        scale: true,
        boundaryGap: [0, '100%'],
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
          formatter: '{value} ' + this.unit //单位
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
          name: this.nameA,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataAY,
          itemStyle: {
            normal: {
              color: '#FFA500',
            }
          },

        },
        {
          name: this.nameB,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataBY,
          itemStyle: {
            normal: {
              color: '#09b0f5',
            }
          },

        },
        {
          name: this.nameC,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataCY,
          itemStyle: {
            normal: {
              color: '#800080',
            }
          },

        }
      ]
    }, true);

    document.getElementById('chart').removeAttribute("_echarts_instance_");


  }
  clickChart3() {
    const ec = echarts as any;
    var myChart = ec.init(document.getElementById('chart'));

    myChart.setOption({
      backgroundColor: '',
      legend: {
        data: [this.nameA, this.nameB, this.nameC, this.nameN],
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

        scale: true,
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
          formatter: '{value} ' + this.unit //单位
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
          name: this.nameA,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataAY,
          itemStyle: {
            normal: {
              color: '#FFA500',
            }
          },

        },
        {
          name: this.nameB,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataBY,
          itemStyle: {
            normal: {
              color: '#09b0f5',
            }
          },

        },
        {
          name: this.nameC,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataCY,
          itemStyle: {
            normal: {
              color: '#00FF7F',
            }
          },

        },
        {
          name: this.nameN,
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.dataNY,
          itemStyle: {
            normal: {
              color: '#800080',
            }
          },

        }
      ]
    }, true);


    document.getElementById('chart').removeAttribute("_echarts_instance_");


  }
  segmentChanged() {
    this.electricity()
  }
  startChanged() {
    let sTime = new Date(this.start).getTime();

    let eTime = new Date(this.end).getTime();

    let reduceDate = (eTime - sTime) / 1000 / 60 / 60 / 24;
    if (sTime > eTime) {
      const toast = super.showToast(this.toastCtrl, '开始日期不能大于结束日期！');


    } else if (reduceDate > 3) {
      const toast = super.showToast(this.toastCtrl, '时间相隔不能超过3天');
    } else {
      this.electricity()
    }

  }
  endChanged() {
    let sTime = new Date(this.start).getTime();

    let eTime = new Date(this.end).getTime();

    let reduceDate = (eTime - sTime) / 1000 / 60 / 60 / 24;
    if (sTime > eTime) {
      const toast = super.showToast(this.toastCtrl, '结束日期不能小于开始日期');
    } else if (reduceDate > 3) {
      const toast = super.showToast(this.toastCtrl, '时间相隔不能超过3天');
    } else {
      this.electricity()
    }

  }
  back() {
    this.navCtrl.setRoot(DevicePage)
  }
}
