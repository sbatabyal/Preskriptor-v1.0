import { Component, OnInit, Input, ViewChild, NgModule} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Letterhead } from '../../../../models/prescription.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'get-header-form',
  templateUrl: './getHeaders.html',
  styleUrls: ['./getHeaders.scss'],
  providers: [AdminPageService]
})
    
export class GetHeaderComponent implements OnInit{ 

    public headers: Letterhead[];     
    settings = {
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
            ChamberName: {
                title: 'Chamber Name',
                type: 'string',
                sort: true                
            },
            ChamberAddress: {
                title: 'Chamber Address',
                type: 'string',
                sort: true                
            },
            ChamberPhone: {
                title: 'Chamber Phone',
                type: 'string',
                sort: true                
            },
            Mobile: {
                title: 'Mobile',
                type: 'string',
                sort: true
            },
            Fax: {
                title: 'Fax',
                type: 'string',
                sort: true                
            },
            Email: {
                title: 'E-mail',
                type: 'string',
                sort: true                
            },
            Website: {
                title: 'Website',
                type: 'string',
                sort: true                
            },
            Timings: {
                title: 'Days & Time',
                type: 'string',
                sort: true                
            }
        }
    };
    source: LocalDataSource = new LocalDataSource(); 
    jsonData: any;     
            
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    {        
        //this.source.refresh();
        //this.adminService.getAllHeaders().subscribe((data) => {
        //    this.jsonData = this.createChamberJSON(data);
        //    this.source.load(this.jsonData);
        //    console.log(data);
        //});         
    }

    ngOnInit()
    {      
        this.source.refresh();
        this.adminService.getAllHeaders().subscribe((data) => {
            this.jsonData = this.createChamberJSON(data);
            this.source.load(this.jsonData);
            console.log(data);
        });  
    }
    
    //getAllHeaders(): any {

    //    this.adminService.getAllHeaders().subscribe(

    //        data => {                                
    //            this.headers = data;
    //        },
    //        err => {
    //            console.log("Error while retrieving existing Header Details : " + err);
    //        },
    //        () => {
    //            console.log("Existing Header Details retrieved successfully.");
    //        }
    //    )
    //}    

    createChamberJSON(headers: any): any {

        var jsonList = [];
        var jsonData = {};        

        for (let item of headers) {
            var address = '';
            jsonData = {};
            jsonData["ChamberName"] = item.chamberName;

            if (item.chamberAddressLine1 != null)
            { address += item.chamberAddressLine1 }
            if (item.chamberAddressLine2 != null)
            { address += "\n" + item.chamberAddressLine2}
            if (item.chamberAddressLine3 != null)
            { address += "\n" + item.chamberAddressLine3 }
                console.log(address.toString())

            jsonData["ChamberAddress"] = address.toString();
            jsonData["ChamberPhone"] = item.chamberPhone != null ? item.chamberPhone : '-';
            jsonData["Mobile"] = item.mobile != null ? item.mobile : '-';
            jsonData["Fax"] = item.fax != null ? item.fax : '-';
            jsonData["Email"] = item.email != null ? item.email : '-';
            jsonData["Website"] = item.website != null ? item.website : '-';
            jsonData["Timings"] = item.timings != null ? item.timings : '-';            

            jsonList.push(jsonData);
        }
        console.log(jsonList)
        return jsonList;
    }    

    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            console.log(event.data.ChamberName);
            let chamberName = event.data.ChamberName;
            var res = this.adminService.deleteHeader(chamberName);
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
}
