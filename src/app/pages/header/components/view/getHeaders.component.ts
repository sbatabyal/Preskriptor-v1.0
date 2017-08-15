import { Component, OnInit, Input, ViewChild, NgModule} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Header } from '../../../../models/prescription.model';

@Component({
  selector: 'get-header-form',
  templateUrl: './getHeaders.html',
  styleUrls: ['./getHeaders.css'],
  providers: [AdminPageService]
})
    
export class GetHeaderComponent implements OnInit{ 

    public headers: Header[];       
            
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    {
        this.getAllHeaders();
        //console.log(this.data);        
    }

    ngOnInit()
    {      
        
    }
    
    getAllHeaders(): any {

        this.adminService.getAllHeaders().subscribe(

            data => {                                
                this.headers = data;
            },
            err => {
                console.log("Error while retrieving existing Header Details : " + err);
            },
            () => {
                console.log("Existing Header Details retrieved successfully.");
            }
        )
    }    
    
}
