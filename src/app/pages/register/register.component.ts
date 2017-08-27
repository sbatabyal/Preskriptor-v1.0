import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { AuthenticationService } from '../../services/index';
import { User } from '../../models/index';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  providers: [AuthenticationService]
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords: FormGroup;
  public user: User = new User();
  public isRegistered: number = 0;
  public error: string;

  public submitted:boolean = false;

  constructor(fb: FormBuilder, private authenticationService: AuthenticationService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.user.name = this.name.value;
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }

  public register(values: Object): void {
      this.submitted = true;
      if (this.form.valid) {          
          this.authenticationService.register(this.user)
              .subscribe(
              success => {
                  if (success.State == 1) {
                      console.log(success);
                      this.isRegistered = 1;                      
                  }
                  else {                      
                      this.isRegistered = -1;
                      this.error = success.Message;
                  }
                  this.form.reset();
              },
              err => {
                  this.isRegistered = -1;
                  console.log(err);
                  this.form.reset();
              }
              
           )
      }
  }
}
