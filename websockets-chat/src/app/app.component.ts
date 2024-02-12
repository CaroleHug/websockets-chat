import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from './websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'websockets-chat';

  userName = '';
  users: User[] = [];

  constructor(private websocketService: WebsocketService){
    this.websocketService.getMessages().subscribe(data => {
      this.users.push(data);
    })
  }

  updateName(){
    this.websocketService.addName(this.userName);
  }

}
