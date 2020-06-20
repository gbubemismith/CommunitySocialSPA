import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input('recipientId') recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, 
    private auth: AuthService, 
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageThread(this.auth.decodedToken.nameid, this.recipientId)
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.auth.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';

      }, error => {
        this.alertify.error(error);
      });
  }

}
