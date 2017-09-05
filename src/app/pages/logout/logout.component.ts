import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'logout',    
    template: '',
    providers: [AuthenticationService, AlertService]
})
export class LogoutComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private router: Router) { }

    ngOnInit()
    {
        this.authenticationService.logout();
        this.router.navigate(['../../login']);
    }    
}

