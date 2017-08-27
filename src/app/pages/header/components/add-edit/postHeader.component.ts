import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Header } from '../../../../models/prescription.model';

@Component({
  selector: 'header-form',
  templateUrl: './postHeader.html',
  styleUrls: ['./postHeader.css'],
  providers: [AdminPageService]
})
export class PostHeaderComponent implements OnInit{
    
    public header: Header = new Header('');    
    public static inputCount = 1;
    public addHeaderForm: FormGroup;
    public isSuccess: number = 0;    
            
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    { }

    ngOnInit()
    {           
        this.addHeaderForm = this.fb.group({

            //Doctor Details
            docName: ['', [Validators.required]],      
            degree: ['', [Validators.required]],      
            specialization: ['', [Validators.required]],      
            mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],

            //Chamber Details
            chamberName: ['', [Validators.required]],
            chamberPhone: ['', [Validators.required]],
            fax: [''],
            chamberAddressLine3: [''],
            chamberAddressLine2: [''],
            chamberAddressLine1: ['', [Validators.required]],
            email: ['', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')], 
            website: ['', Validators.pattern('^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$')],  
            dayTime: ['', [Validators.required]]  

        });        
    }
    
    
    SaveHeader(headerInput: any, isValid: boolean) {

        this.isSuccess = 0;
        let parsedFormData = this.parseFormJSON(headerInput);
        this.header = new Header(parsedFormData);

        this.adminService.addNewHeader(this.header).subscribe(

            data => {
                console.log(data);
            },
            err => {
                this.isSuccess = -1;
                //this.drugForm.reset();          
                console.log("Error occurred while saving Header Data : " + err);
            },
            () => {
                this.isSuccess = 1;
                this.addHeaderForm.reset();
                console.log("Header Data saved successfully.");
            }
        )

    }

    parseFormJSON(formData: any): any {
        var headerModel = new Header('');        

        headerModel.chamberAddressLine1 = formData["chamberAddressLine1"];
        headerModel.chamberAddressLine2 = formData["chamberAddressLine2"];
        headerModel.chamberAddressLine3 = formData["chamberAddressLine3"];
        headerModel.chamberName = formData["chamberName"];
        headerModel.chamberPhone = formData["chamberPhone"];
        headerModel.dayTime = formData["dayTime"];
        headerModel.degree = formData["degree"];
        headerModel.doctorName = formData["docName"];
        headerModel.email = formData["email"];
        headerModel.fax = formData["fax"];
        headerModel.mobile = formData["mobile"];
        headerModel.specialization = formData["specialization"];
        headerModel.website = formData["website"];
        
        return headerModel;
    }      

    Reset() {
        this.addHeaderForm.reset();
    }
    
}
