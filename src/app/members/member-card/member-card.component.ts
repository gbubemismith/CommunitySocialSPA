import { User } from './../../models/user';
import { Component, OnInit, Input } from '@angular/core';
 

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input('user') user: User;

  constructor() { }

  ngOnInit() {
  }

}
