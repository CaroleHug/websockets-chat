import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { RetroService } from './retro.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'websockets-chat';

  userName = '';
  users: string[] = [];
  subscription: Subscription;

  constructor(private websocketService: WebsocketService, private retroService: RetroService){
    this.subscription = this.websocketService.getMessages().subscribe(data => {
      this.users = data.users;
    })
  }
  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.subscription.unsubscribe();
  }

  updateName(){
    this.websocketService.addName(this.userName);
  }
}
