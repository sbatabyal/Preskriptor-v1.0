import { Component, OnInit, Input, ViewChild, NgModule, OnDestroy} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Test } from '../../../../models/prescription.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'get-test-form',
  templateUrl: './getTests.html',
  styleUrls: ['./getTests.scss'],
  providers: [AdminPageService]
})
    
export class GetTestComponent implements OnInit, OnDestroy{
            
    settings = {        
        pager: {
            display: true,
            perPage: 10
        },
        actions: {
            add: false,
            edit: false
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
        },
        columns: {            
            value: {
                title: 'Test Type',
                type: 'string'                
            }
        }
    };
    source: LocalDataSource = new LocalDataSource();   
    jsonData: any; 
    private obs$: any;  
          
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    {                   
    }

    ngOnInit()
    {            
        this.source.refresh();
        this.obs$ = this.adminService.getAllTests().subscribe((data) => {
            this.jsonData = this.createTestJSON(data);
            this.source.load(this.jsonData);            
            console.log(data);
        });                                      
    }
        

    createTestJSON(tests : any): any {
                                     
        var jsonList = [];
        var jsonData = {}; 
        let count : number = 1;       

        for (let item of tests)
        {
            jsonData = {};
            jsonData["key"] = count;
            jsonData["value"] = item.type;
            count++;
                     
            jsonList.push(jsonData);
        }        
        return jsonList;
    }

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            console.log(event.data.value);
            let testName = event.data.value;
            var res = this.adminService.deleteTest(testName);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
    ngOnDestroy() {
        if (this.obs$) { this.obs$.unsubscribe(); }
    }    
}
