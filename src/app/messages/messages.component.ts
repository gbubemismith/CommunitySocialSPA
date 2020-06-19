import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertifyService } from './../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../models/pagination';





@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer =  'Unread';


  constructor(private userService: UserService,
          private auth: AuthService,
          private route: ActivatedRoute,
          private aleritfy: AlertifyService) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });

    
  }
  
  
  loadMessages() {

    console.log(this.messageContainer);

    this.userService.getMessages(this.auth.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.aleritfy.error(error);
    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event;
    this.loadMessages();
  }

}
