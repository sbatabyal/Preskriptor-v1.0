import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailValidator } from '../../theme/validators';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [AuthenticationService, AlertService]
})
export class Login implements OnInit{

  public form:FormGroup;
  public userEmail:AbstractControl;
  public password:AbstractControl;
  public submitted: boolean = false;
  public isLoggedIn: number = 0;
  public error: string;    

  loading = false;
  returnUrl: string;


  constructor(fb: FormBuilder, private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {      

    this.form = fb.group({
        'userEmail': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      });

    
    this.userEmail = this.form.controls['userEmail'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  

  //public onSubmit(values:Object):void {
  //  this.submitted = true;
  //  if (this.form.valid) {
  //    // your code goes here
  //    console.log(this.userName.value);
  //      this.authenticationService.login(this.userName.value, this.password.value)
  //          .subscribe(
  //          data => {
  //              this.router.navigate(['./pages/dashboard']);
  //          },
  //          error => {
  //              //alert(result.Message);
  //              this.alertService.error(error);
  //              this.loading = false;
  //          });
  //  }
  //}
  
  public login(values: Object): void {
      this.submitted = true;
      if (this.form.valid) {          
          console.log(this.userEmail.value);
          this.authenticationService.login(this.userEmail.value, this.password.value)
              .then(              
                  (success) => {
                      if (success.State == 1) {
                          console.log(success);
                          this.isLoggedIn = 1;
                          this.router.navigate(['./pages/dashboard']);
                      }
                      else
                      {
                          //alert(success.Message); 
                          this.isLoggedIn = -1;  
                          this.error = success.Message;                       
                      } 
                      this.form.reset();                 
                  }
              )
             .catch(                
              (err) => {
                  this.isLoggedIn = -1;
                  this.error = "Login failed. Please try again.";
                      console.log(err); 
                      this.form.reset();                 
                  }
              )
         }
  }
  
}
