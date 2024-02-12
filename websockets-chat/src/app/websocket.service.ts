import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket;
  private url = 'http://localhost:3000';

  constructor() { 
    this.socket = io(this.url);
  }

  addName(name: string) {
    this.socket.emit('add userName', name)
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
  users: string[];
}