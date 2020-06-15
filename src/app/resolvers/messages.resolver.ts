import { AuthService } from './../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageNumber =  1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private auth: AuthService
        ) {}


    resolve(route: ActivatedRouteSnapshot) : Observable<Message[]> {

        return this.userService.getMessages(this.auth.decodedToken.nameid,this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
    
}
