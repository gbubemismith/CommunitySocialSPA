import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit, Input } from '@angular/core';
 

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input('user') user: User;

  constructor(private auth: AuthService, 
    private userService: UserService, 
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.auth.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
 
}
