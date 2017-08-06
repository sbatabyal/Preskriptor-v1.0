import { Component, OnInit, Input, ViewChild, NgModule} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Test } from '../../../../models/prescription.model';

@Component({
  selector: 'get-test-form',
  templateUrl: './getTests.html',
  styleUrls: ['./getTests.css'],
  providers: [AdminPageService]
})
    
export class GetTestComponent implements OnInit{
        
    public data: any;  
    public rowsOnPage = 5;
    public sortBy = "Test Type";
    public sortOrder = "asc";
            
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    {
        this.getAllTests();
        console.log(this.data);        
    }

    ngOnInit()
    {      
        
    }
    
    getAllTests(): any {

        this.adminService.getAllTests().subscribe(

            data => {
                //this.data = data;
                //console.log(this.data);
                var json = this.createTestJSON(data);
                this.data = json;
            },
            err => {
                console.log("Error while retrieving existing Test Details : " + err);
            },
            () => {
                console.log("Existing Test Details retrieved successfully.");
            }
        )
    }

    createTestJSON(tests : any): any {
                                     
        var jsonList = [];
        var jsonData = {}; 
        let count : number = 1;       

        for (let item of tests)
        {
            jsonData = {};
            jsonData["key"] = count;
            jsonData["value"] = item;
            count++;
                     
            jsonList.push(jsonData);
        }        
        return jsonList;
    }
    
}
