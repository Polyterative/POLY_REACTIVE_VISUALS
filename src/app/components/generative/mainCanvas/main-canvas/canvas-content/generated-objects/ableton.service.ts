import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
// import * as osc from 'osc';
// import * as osc from 'osc';
// import osc from 'osc';
// import 'osc';

@Injectable({
  providedIn: 'root'
})
export class AbletonService {
  public readonly events: { kick: EventContainer } = {
    kick: new EventContainer('/kick')
  }

  system = {
    messageReceived$: new Subject<[string, number]>()
  }

  constructor() {

    this.setupSocketListener();

    this.handleMessages();

  }

  private handleMessages(): void {
    let eventContainers: EventContainer[] = Object.values(this.events);

    this.system.messageReceived$
      .subscribe(
        ([channel, value]) => {
          // update value on message received

          let container: EventContainer | undefined = eventContainers.find(x => x.channel === channel);

          if (container) {
            container.value$.next(value * 100);
            // console.log(`received value ${value} on channel ${channel}`);
          } else {
            console.log(`%cNo container found for channel ${ channel }`, 'color: red');
          }

        }
      );
  }

  private setupSocketListener(): void {
    let socket = io('http://localhost:8081');

    // client-side
    socket.on('connect', () => {
      // write 'connected to socket ' in green text in console
      console.log(`\x1b[32m%s\x1b[0m`, `connected to socket, id: ${ socket.id }`);
    });

    socket.on('disconnect', () => {
      console.log(socket.id);
    });

    let events = this.system;

    socket.on('message', function (obj: [string, number]) {
      // console.log('.');
      // console.log('obj', new OscMessage(obj[0], obj[1]));
      events.messageReceived$.next(obj);
    });

    // socket.on('emit', function (obj) {
    //   // console.log('.');
    //   // console.log('obj', obj);
    //   events.note$.next(new OscMessage(obj[0], obj[1]));
    // });
  }
}

export interface OscMessage {
  channel: string;
  value: number;
}

export class EventContainer {
  constructor(
    public channel: string,
    public value$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  ) {

  }
}
