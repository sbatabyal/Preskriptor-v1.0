import { Component, OnInit, Input, ViewChild, NgModule} from '@angular/core';
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

export class GetDrugComponent implements OnInit{        

    settings = {
        //add: {
        //    addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        //    createButtonContent: '<i class="ion-checkmark"></i>',
        //    cancelButtonContent: '<i class="ion-close"></i>',
        //},
        //edit: {
        //    editButtonContent: '<i class="ion-edit"></i>',
        //    saveButtonContent: '<i class="ion-checkmark"></i>',
        //    cancelButtonContent: '<i class="ion-close"></i>',
        //},
        pager: {
            display: true,
            perPage: 5
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
            TradeName: {
                title: 'Drug Name',
                type: 'string',                
                sort: true                
            },
            Composition: {
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
        //this.data = this.getAllDrugs();   
        this.source.refresh();
        this.adminService.getAllDrugs().then((data) => {
            this.source.load(data);
            //this.tableData = data;
            console.log(data);
        });                           
    }

    ngOnInit()
    {                                
        //this.zone.run(() => this.getAllDrugs());
        this.adminService.getAllDrugs().then((data) => {
            this.source.load(data);
            //this.tableData = data;
            console.log(data);
        });  
    }       

   //getAllDrugs() : any {
   //    this.adminService.getAllDrugs().subscribe(
   //        res => {
   //            this.data = res;
   //            console.log(JSON.stringify(res));                              
   //            return res;
   //        },
   //        err => {
   //            console.log("Error while retrieving existing Drug Details : " + err);
   //        },
   //        () => {
   //            console.log("Existing Drug Details retrieved successfully.");
   //        }
   //    )
   //}    

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
            console.log(event.data.TradeName);
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
