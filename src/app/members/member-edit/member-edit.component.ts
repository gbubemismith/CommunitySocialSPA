import { AlertifyService } from './../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editFormView: NgForm;
  user: User;
  editForm: FormGroup
  
  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService) { }

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
    this.alertifyService.success('Profile updated successfully');
    this.editForm.reset(this.user);
    
  }

}
