import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RetroService {

  private socket: Socket;
  private url = 'http://localhost:3000';

  constructor() { 
    this.socket = io(this.url);
  }

  addPost(post: string) {
    this.socket.emit('add post', {post})
  }

  addAction(postId: number, action: string) {
    this.socket.emit('add post', {id: postId, action})
  }

  getPosts(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      this.socket.on('current retroboard', (data) => {
        observer.next(data);
      });
    })
  }

  newPost(): Observable<Post> {
    return new Observable<Post>(observer => {
      this.socket.on('new post added', (data) => {
        observer.next(data);
      });
    })
  }

  newAction(): Observable<Post> {
    return new Observable<Post>(observer => {
      this.socket.on('new action added', (data) => {
        observer.next(data);
      });
    })
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export interface Post {
  id: number;
  post: string;
  action: string;
}