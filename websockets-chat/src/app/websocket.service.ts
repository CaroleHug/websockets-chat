import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket;
  private url = 'ws://localhost:8080';

  constructor() { 
    this.socket = io(this.url);
  }

  addName(name: string) {
    this.socket.emit('name', name)
  }

  getMessages(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('new user', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })
  }
}

export interface User {
  userName: string;
}