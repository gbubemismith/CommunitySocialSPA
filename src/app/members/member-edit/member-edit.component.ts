import { UserService } from './../../services/user.service';
import { AlertifyService } from './../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editFormView: NgForm;
  user: User;
  editForm: FormGroup
  
  constructor(private route: ActivatedRoute, 
    private alertifyService: AlertifyService,
    private userService: UserService,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.editForm = new FormGroup({
      'introduction': new FormControl(''),
      'lookingFor': new FormControl(''),
      'interests': new FormControl(''),
      'city': new FormControl(''),
      'country': new FormControl('')
    });
  }

  updateUser() {
    
    this.userService.updateUser(this.auth.decodedToken.nameid, this.user).subscribe(next => {
      this.alertifyService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => this.alertifyService.error(error));
    
  }

}
