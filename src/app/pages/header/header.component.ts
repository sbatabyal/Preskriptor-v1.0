import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HeaderService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderDetails } from '../../models/header.model';

@Component({
  selector: 'header-form',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit{
     
    headerInfo = HeaderDetails;
    allHeaders: HeaderDetails[];
    @Input() newHeader;
    constructor(fb: FormBuilder,
        private headerService: HeaderService)
    { }

    ngOnInit()
    {
        this.getHeaders();
    }

    getHeaders(): void {
        this.headerService.getAllHeaders()
            .subscribe(
            headers => {
                this.allHeaders = headers;
                console.log('this.users=' + this.allHeaders);
                console.log('this.users.length=' + this.allHeaders.length);
                
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            })
    }    

    Reset(form: NgForm) {
        form.resetForm();
    }
    
}
