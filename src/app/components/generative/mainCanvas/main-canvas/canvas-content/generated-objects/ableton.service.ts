import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
// import * as osc from 'osc';
// import * as osc from 'osc';
// import osc from 'osc';
// import 'osc';

@Injectable({
  providedIn: 'root'
})
export class AbletonService {
  // osc = osc;
  events = {
    note$: new Subject<number>()
  }

  constructor() {

    let socket = io('http://localhost:8081');

    console.log('socket', socket);

    // client-side
    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('disconnect', () => {
      console.log(socket.id);
    });

    socket.on('connect', function () {
      console.log('connected');

      // sends to socket.io server the host/port of oscServer
      // and oscClient
      // socket.emit(
      //   'config',
      //   {
      //     server: {
      //       port: 8001,
      //       host: '127.0.0.1'
      //     },
      //     client: {
      //       port: 8000,
      //       host: '127.0.0.1'
      //     }
      //   }
      // );
    });

    socket.on('message', function (obj) {
      var status = document.getElementById('status');
      console.log(obj);
    });

    socket.on('emit', function (obj) {
      console.log(obj);
    });

    // interval(1000).subscribe(() => {
    //   socket.emit('message', '/foo/bar 1 2 3');
    //   console.log('sent');
    //
    // });
  }

}

// // osc :Osc
// constructor(
//   zone: NgZone
// ) {
//
//   var socket = io('localhost:8081');
//
//   socket.on('connect', function () {
//     console.warn('connected');
//
//     // sends to socket.io server the host/port of oscServer
//     // and oscClient
//     socket.emit(
//       'config',
//       {
//         server: {
//           port: 8001,
//           host: '127.0.0.1'
//         },
//         client: {
//           port: 8000,
//           host: '127.0.0.1'
//         }
//       }
//     );
//   });
//
//   socket.on('message', function (obj) {
//     // status.innerHTML = obj[1]+" "+obj[0];
//     console.log(obj);
//   });
//
//   console.log(socket);
//
// }
// }
