import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    pageNumber =  1;
    pageSize = 5;

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
        ) {}


    resolve(route: ActivatedRouteSnapshot) : Observable<User[]> {

        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
    
}
