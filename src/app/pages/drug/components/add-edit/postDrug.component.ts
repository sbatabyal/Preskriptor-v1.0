import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Drug } from '../../../../models/prescription.model';

@Component({
    selector: 'drug-form',
    templateUrl: './postDrug.html',
    styleUrls: ['./postDrug.css'],
    providers: [AdminPageService]
})
export class PostDrugComponent implements OnInit {

    public drug: Drug = new Drug('');
    public static inputCount = 1;
    public drugForm: FormGroup;
    public isSuccess: number = 0;

    @Input() newDrug;
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    { }

    ngOnInit() {
        this.drugForm = this.fb.group({
            tradeName: ['', [Validators.required, Validators.minLength(5)]],
            composition: this.fb.array([
                this.initComposition(),
            ])
        });
        //this.patchValuesToDynamicInput();
    }

    initComposition() {
        return this.fb.group({
            comp: []
        });
    }

    addInput() {
        const control = <FormArray>this.drugForm.controls['composition'];
        control.push(this.initComposition());
    }

    removeInput() {
        var arr = new FormArray([]);
        arr = <FormArray>(this.drugForm.controls['composition']);
        var length = arr.length;
        console.log(length);

        const control = <FormArray>this.drugForm.controls['composition'];
        control.removeAt(length - 1);
    }


    SaveDrug(drugInput: any, isValid: boolean) {

        this.isSuccess = 0;
        let parsedFormData = this.parseFormJSON(drugInput);
        this.drug = new Drug(parsedFormData);

        this.adminService.addNewDrug(this.drug).subscribe(

            data => {
                console.log(data);
            },
            err => {
                this.isSuccess = -1;                      
                console.log("Error occurred while saving Drug Data : " + err);
            },
            () => {
                this.isSuccess = 1;
                //this.drugForm.reset();
                console.log("Drug Data saved successfully.");
            }
        )

    }

    parseFormJSON(formData: any): any {
        var drugModel = new Drug('');
        var tempArray: string[] = [];

        drugModel.tradeName = formData["tradeName"];

        for (var i = 0; i < formData["composition"].length; i++) {
            if (formData["composition"][i]["comp"]) {
                tempArray.push(formData["composition"][i]["comp"]);
            }
        }

        drugModel.composition = tempArray;
        return drugModel;
    }

    Reset() {
        this.drugForm.reset();
        this.isSuccess = 0;
    }

    patchValuesToDynamicInput() {
        const control = <FormArray>this.drugForm.controls['composition'];
        //this.data.Social_profiles.forEach(x => { // iterate the array
        //    control.push(this.patch(x.network, x.url)) // push values
        //});
        control.removeAt(0);
        control.push(this.patch('S1'));
        control.push(this.patch('S2'));
    }

    patch(data) {
        return this.fb.group({
            comp: [data]
        });
    }

}
