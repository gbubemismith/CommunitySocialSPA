import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  jwtHelper = new JwtHelperService();

  constructor (private auth: AuthService) {
    
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      auth.currentUser = user;
      this.auth.changeMemberPhoto(user.photoUrl);
    }

  }
  
}
