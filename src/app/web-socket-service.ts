
import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
/*
  Generated class for the WebSocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebSocketServiceProvider {
  ws: WebSocket = null; //定义websocket对象
  constructor() {
    console.log('Hello WebSocketServiceProvider Provider');
  }

  createObservableSocket(url: string): Observable<any> {

    console.log(url);
    
    this.ws = new WebSocket(url);
    this.ws.binaryType = "arraybuffer";
    return new Observable(
    
    observer => {
    
    this.ws.onmessage = (event) => observer.next(event.data);

    this.ws.onerror = (event) => observer.error(event);
    
    this.ws.onclose = (event) => observer.complete();
    this.ws.onopen = (event) => observer.next(event.type);
  }
    )
    
    }
     
    
    //返回消息
    
    sendMessage(msg: string) {
    
    this.ws.send(msg);
    
    }
    

}
