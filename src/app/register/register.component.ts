import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  

  constructor(private auth: AuthService, 
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {

    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() { 
    if (this.registerForm.valid) {
      let dateOfBirth = this.ngbDateParserFormatter.format(this.registerForm.controls['dateOfBirth'].value);

      this.registerForm.controls['dateOfBirth'].setValue(dateOfBirth);

      console.log(this.registerForm.value);

      this.user = Object.assign({}, this.registerForm.value);
      this.auth.register(this.user).subscribe(() => {
        this.alertifyService.success('Registration successful');
      }, error => this.alertifyService.error(error), 
      () => {
        this.auth.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
