import {Component, OnInit} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [AuthenticationService, AlertService]
})
export class Login implements OnInit{

  public form:FormGroup;
  public userName:AbstractControl;
  public password:AbstractControl;
  public submitted: boolean = false;

  loading = false;
  returnUrl: string;


  constructor(fb: FormBuilder, private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {

    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });

    
    this.userName = this.form.controls['userName'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      console.log(this.userName.value);
        this.authenticationService.login(this.userName.value, this.password.value)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
  }
}
