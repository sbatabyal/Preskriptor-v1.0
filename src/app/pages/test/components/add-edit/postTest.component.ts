import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm, FormArray } from '@angular/forms';
import { AdminPageService } from '../../../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Test } from '../../../../models/prescription.model';

@Component({
  selector: 'test-form',
  templateUrl: './postTest.html',
  styleUrls: ['./postTest.css'],
  providers: [AdminPageService]
})
export class PostTestComponent implements OnInit{
    
    public test: Test = new Test('');    
    public static inputCount = 1;
    public testForm: FormGroup;
    public isSuccess: number = 0;    
        
    @Input() newTest;
    constructor(private fb: FormBuilder,
        private adminService: AdminPageService)
    { }

    ngOnInit()
    {           
        this.testForm = this.fb.group({
            type: ['', [Validators.required]],
            //subTypes: this.fb.array([
            //    this.initSubType(),
            //])
        });
        //this.patchValuesToDynamicInput();
    }

    initSubType() {
        return this.fb.group({                               
            sType : []
        });
    }  

    addInput() {
        const control = <FormArray>this.testForm.controls['subTypes'];
        control.push(this.initSubType());
    }

    removeInput(name: string) {
        var arr = new FormArray([]);
        arr = <FormArray>(this.testForm.controls['subTypes']);
        var length = arr.length;
        console.log(length);

        const control = <FormArray>this.testForm.controls['subTypes'];
        control.removeAt(length - 1);
    }

    patchValuesToDynamicInput() {
        const control = <FormArray>this.testForm.controls['subTypes'];
        //this.data.Social_profiles.forEach(x => { // iterate the array
        //    control.push(this.patch(x.network, x.url)) // push values
        //});
        control.removeAt(0);
        control.push(this.patch('S1'));
        control.push(this.patch('S2'));
    }

    patch(data) {
        return this.fb.group({
            sType: [data]            
        });
    }

    SaveTest(testInput: any, isValid: boolean) {

        this.isSuccess = 0;
        console.log(testInput);         

        this.adminService.addNewTest(testInput).subscribe(

            data => {                            
                console.log(data);                
            },
            err => {
                this.isSuccess = -1;      
                //this.testForm.reset();          
                console.log("Error occurred while saving Test Data : " + err);
            },
            () => {
                this.isSuccess = 1;    
                this.testForm.reset();           
                console.log("Test Data saved successfully.");
            }
        )          
        
    }  

    // Not used:
    parseFormJSON(formData : any) : any
    {
        var testModel = new Test('');
        var tempArray: string[] = [];

        testModel.type = formData["type"];
        console.log(testModel.type);
        console.log(formData["subTypes"]);
        
        for (var i = 0; i < formData["subTypes"].length; i++) {
            if (formData["subTypes"][i]["sType"])
            {
                tempArray.push(formData["subTypes"][i]["sType"]);                
            }            
        }

       // testModel.subTypes = tempArray;
        return testModel;
    }

    Reset() {
        this.testForm.reset();
    }
    
}
