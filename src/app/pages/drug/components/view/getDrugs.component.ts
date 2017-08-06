import { Component, OnInit, Input, ViewChild, NgModule, NgZone} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Drug } from '../../../../models/index';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Component({
  selector: 'get-drug-form',
  templateUrl: './getDrugs.html',
  styleUrls: ['./getDrugs.css'],
  providers: [AdminPageService]
})

export class GetDrugComponent implements OnInit{
        
    public data : any; 
    private observable: Observable<Drug[]>;  
    public rowsOnPage = 5;
    public sortBy = "Trade Name";
    public sortOrder = "asc";
    
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService, private zone : NgZone)
    {    
        //this.data = this.getAllDrugs();                              
    }

    ngOnInit()
    {                        
        //if (localStorage.getItem('drugs')) {            
        //    this.data = localStorage.getItem('drugs');
        //}
        //else {
        //    this.getAllDrugs();
        //}
        this.zone.run(() => this.getAllDrugs());
    }       

   getAllDrugs() : any {
       this.adminService.getAllDrugs().subscribe(
           res => {
               this.data = res;
               console.log(JSON.stringify(res));               
               //localStorage.setItem('drugs', res);
               return res;
           },
           err => {
               console.log("Error while retrieving existing Drug Details : " + err);
           },
           () => {
               console.log("Existing Drug Details retrieved successfully.");
           }
       )
   }

    //getAllDrugs(): void {
    //    this.adminService.getAllDrugs()
    //        .then(drugs => {
    //            this.data = drugs
    //            console.log(JSON.stringify(drugs));
    //        });
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
    
    ngOnDestroy() {
        this.data = null;
    }    
    //

    
}
