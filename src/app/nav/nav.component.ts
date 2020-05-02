import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private auth: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    
  }

  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertifyService.success('successfully logged in');
    }, error => {
      this.alertifyService.error('Failed to login');
    });
  }

  loggedIn() {
    return this.auth.loggdIn();
  }

  logout() {
    localStorage.removeItem('token');

    this.alertifyService.message('logged out');
  }

}
