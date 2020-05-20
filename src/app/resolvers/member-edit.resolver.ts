import { AuthService } from './../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private auth: AuthService
        ) {}


    resolve(route: ActivatedRouteSnapshot) : Observable<User> {
        return this.userService.getUser(this.auth.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        )
    }
    
}
