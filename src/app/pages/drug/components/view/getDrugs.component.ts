import { Component, OnInit, Input, ViewChild, NgModule, OnDestroy} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Drug } from '../../../../models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Component({
  selector: 'get-drug-form',
  templateUrl: './getDrugs.html',
  styleUrls: ['./getDrugs.scss'],
  providers: [AdminPageService]
})

export class GetDrugComponent implements OnInit, OnDestroy{        

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
            tradeName: {
                title: 'Drug Name',
                type: 'string',                
                sort: true                
            },
            composition: {
                title: 'Composition',
                type: 'string',
                sort: true                
            }            
        }
    };
    source: LocalDataSource = new LocalDataSource();        
    
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    {            
                                
    }

    ngOnInit()
    {                                
        this.source.refresh();        
        this.adminService.getAllDrugs().then((data) => {
            this.source.load(data);            
            console.log(data);
        });  
    }             

    createTestJSON(drugs : any): any {
                                     
        var drugList = [];
        var composition = [];
        var drug = {};               

        for (let item of drugs)
        {
            drug = {};
            drug["tradeName"] = item["tradeName"];
            composition = []; 
            let compList = item["composition"]; 
            if (compList){
                for (let comp of compList) {
                    composition.push(comp);
                }
            }
            drug["composition"] = composition;                                 
            drugList.push(drug);
        }        
        return drugList;
    }

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            console.log(event.data.tradeName);
            let drugName = event.data.tradeName;
            var res = this.adminService.deleteDrug(drugName);            
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    ngOnDestroy()
    {        
        this.source = null;
    }        
}
