import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(
    private auth: AuthService, 
    private alertifyService: AlertifyService, 
    private router: Router
    ) { }

  ngOnInit() {
    
  }

  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertifyService.success('successfully logged in');
    }, error => {
      this.alertifyService.error('Failed to login');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.auth.loggdIn();
  }

  logout() {
    localStorage.removeItem('token');

    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

}
