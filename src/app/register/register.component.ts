import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private auth: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {

    this.auth.register(this.model).subscribe(() => this.alertifyService.success('registration successful'),
              (error) => this.alertifyService.error(error));
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
