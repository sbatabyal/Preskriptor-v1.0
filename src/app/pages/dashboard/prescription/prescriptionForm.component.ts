import { Component, OnInit, NgModule, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PrescriptionService, AutoCompleteService, SearchService, AdminPageService } from '../../../services/index';
import { Prescription, Patient, Findings, Test, Medication, Drug, Letterhead } from '../../../models';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';


@Component({
    selector: 'prescription-form',
    templateUrl: './prescriptionForm.html',
    styleUrls: ['./prescriptionForm.css'],
    providers: [PrescriptionService, AutoCompleteService, SearchService, AdminPageService]    
})


export class PrescriptionFormComponent implements OnInit, OnDestroy {
    
    public prescriptionForm: FormGroup; // model driven form   
    public submitted: boolean = false; // keep track on whether form is submitted    
    protected names = [];
    public patientsCache = [];
    public testCache = [];    
    public drugCache = [];
    public isSuccess: number = 0;
    public patientFound: number = 0;
    public isExistingPatient: number = 0; // Yes = 1, No = -1
    public isPanelLetterHeadOpen: boolean = false;     
    public isPatientInfoOpened: boolean = false;   
    public loading: string; 
    public chamberNames = []; 

    private getTestsObs$: any;
    private getDrugsObs$: any;
    private getPatientNamesObs$: any;
    private getChambersObs$: any;
    private getCompositionObs$: any;
    private getPatientObs$: any;   
    private getSearchResultsObs$: any;   
    private savePrescriptionObs$: any;       

    @ViewChild('modalSearchResults')
    modal: ModalComponent;
    
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    css: boolean = false;    
    selected: string;    
    searchInput: any;
    selectedRow: Number;    

    public rowsOnPage = 10;
    public sortBy = "Name";
    public sortOrder = "asc";
    public filterQuery = "";

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;
    public patientNamesCache = [];
    public data: any;
    public searchStr: any;
    public selectedPatient: any; 
    public existingPatientId: string;      
    
    public prescriptionModel: Prescription;
    
    protected prescription: Prescription;
    constructor(private fb: FormBuilder, private autoCompleteService: AutoCompleteService, private searchService: SearchService,
        private prescriptionService: PrescriptionService, private adminPageService: AdminPageService) {  
        this.loading = "fa-lg fa-spinner fa-spin icon-cog blueincolor";             
    }
    ngOnInit() {        
        this.prescriptionModel = new Prescription('[]');

        this.patientNamesCache = this.getPatientNamesFromCache();   
        this.testCache = this.getTestsFromCache();  
        this.drugCache = this.getDrugsFromCache();  
        this.chamberNames = this.getChamberNames();                        
        
        this.prescriptionForm = this.fb.group({

            /*Patient Info*/
            title: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            _name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            age: ['', Validators.pattern('[0-9]*')],
            bloodGroup: ['', Validators.compose([Validators.required, Validators.pattern('(A|B|AB|O)[-+]')])],            
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],
            email: ['', Validators.pattern('^[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')],            
            search: [],
            parity: [],
            chamberSelect: ['', Validators.required],

            /*Investigations*/
            chiefComplaints: this.fb.array([
                this.initInputContainer('chiefComplaints'),
            ]),

            personalHistory: this.fb.array([
                this.initInputContainer('personalHistory'),
            ]),

            familyHistory: this.fb.array([
                this.initInputContainer('familyHistory'),
            ]),

            examinations: this.fb.array([
                this.initInputContainer('examinations'),
            ]),

            additionalFindings: this.fb.array([
                this.initInputContainer('additionalFindings'),
            ]),

            /*Miscellaneous*/
            followUp: this.fb.array([
                this.initInputContainer('followUp'),
            ]),

            patientResponse: this.fb.array([
                this.initInputContainer('patientResponse'),
            ]),

            /*Tests*/
            testTypes: this.fb.array([
                this.initInputContainer('testTypes'),
            ]),

            /*Medication*/
            medications: this.fb.array([
                this.initInputContainer('medications'),
            ]),
        });
    }

    initInputContainer(name: string) {
        if (name === 'chiefComplaints'){
            return this.fb.group({
                complaint: []
            });
        }
        if (name === 'personalHistory'){
            return this.fb.group({
                personal: []
            });
        }
        if (name === 'familyHistory'){
            return this.fb.group({
                family: []
            });
        }
        if (name === 'examinations'){
            return this.fb.group({
                exam: []
            });
        }
        if (name === 'additionalFindings'){
            return this.fb.group({
                additional: []
            });
        }
        if (name === 'followUp') {
            return this.fb.group({
                follow: []
            });
        }
        if (name === 'patientResponse') {
            return this.fb.group({
                response: []
            });
        }
        if (name === 'testTypes') {
            return this.fb.group({
                testType: []
            });
        }
        if (name === 'medications') {                        
            return this.fb.group({
                //drugName: ['', Validators.required],
                //dosage:['', Validators.required]
                drugName: [],
                dosage: []
            });
        }
    }

    addInput(name : string) {
        const control = <FormArray>this.prescriptionForm.controls[name];
        control.push(this.initInputContainer(name));
    }
    
    removeInput(name: string) {
        var arr = new FormArray([]);           
        arr = <FormArray>(this.prescriptionForm.controls[name]); 
        var length = arr.length;             
                
        const control = <FormArray>this.prescriptionForm.controls[name];
        control.removeAt(length - 1);
    }

    savePrescription(model: any, isValid: boolean) {        
    this.isSuccess = 0;
    this.submitted = true;                    

    let savePresrescriptionModel: Prescription = new Prescription('');
    let parsedFormData= this.parseFormJSON(model);
    savePresrescriptionModel = new Prescription(parsedFormData);  
                                                                                                                         
    this.savePrescriptionObs$ = this.prescriptionService.savePrescription(savePresrescriptionModel).subscribe(
        data => {
            console.log(data);
        },
        err => {
            this.isSuccess = -1;
            console.log("Error occurred while saving Prescription : " + err);
            //document.body.scrollTop = 0;
            window.scrollTo(0, 0);
        },
        () => {
            this.isSuccess = 1;
            this.prescriptionForm.reset();
            console.log("Prescription saved successfully.");
            //document.body.scrollTop = 0;
            window.scrollTo(0,0);
        }
    )
    console.log(savePresrescriptionModel, isValid);
            
}

    SaveAndPrintPrescription(model: any, isValid: boolean) {
          this.isSuccess = 0;
          this.submitted = true;               

          let savePresrescriptionModel: Prescription = new Prescription('');
          let parsedFormData = this.parseFormJSON(model);
          savePresrescriptionModel = new Prescription(parsedFormData);                                                                                                                 
          this.savePrescriptionObs$ = this.prescriptionService.SaveAndPrintPrescription(savePresrescriptionModel).subscribe(

              data => {                             
                  var fileURL = URL.createObjectURL(data);                  
                  window.open(fileURL);
              },
              err => {
                  this.isSuccess = -1;
                  console.log("Error occurred while saving Prescription : " + err);                  
                  window.scrollTo(0, 0);
              },
              () => {
                  this.isSuccess = 1;
                  //this.prescriptionForm.reset();
                  this.isExistingPatient = 0;
                  this.existingPatientId = null;
                  console.log("Prescription saved successfully.");                  
                  window.scrollTo(0, 0);
              }
          )
          console.log(savePresrescriptionModel, isValid);

      }        
    //For saving
    parseFormJSON(formData: any) {        

        var pres = new Prescription(''); 
        pres.findings = new Findings();
        pres.followUp = [];
        pres.patientResponse = [];
        pres.tests = [];    
        pres.medications = [];  
        
        var findings = new Findings();
        pres.patientInfo = new Patient('');    
        pres.patientInfo.age = formData["age"];
        pres.patientInfo.bloodGroup = formData["bloodGroup"];
        pres.patientInfo.email = formData["email"];
        pres.patientInfo.parity = formData["parity"];
        pres.patientInfo.contactNumber = formData["phone"];
        pres.patientInfo.title = formData["title"];
        pres.patientInfo.patientName = formData["_name"];        
        pres.prescriptionDate = new Date().toLocaleDateString();

        if (this.isExistingPatient == 1)
        {
            pres.prescriptionID = this.existingPatientId;    
            pres.patientInfo.patientID = this.existingPatientId;        
        }
        else
        {
            pres.prescriptionID = null;
            pres.patientInfo.patientID = null;
        }   

        pres.letterhead = new Letterhead('');
        pres.letterhead.chamberName = formData["chamberSelect"];  
        console.log(formData["chamberSelect"]);           

        var tempArray: string[] = [];               

        for (var i = 0; i < formData["chiefComplaints"].length; i++) {
            if (formData["chiefComplaints"][i]["complaint"]) {
                tempArray.push(formData["chiefComplaints"][i]["complaint"]);
            }
        }
        pres.findings.chiefComplaints = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["personalHistory"].length; i++) {
            if (formData["personalHistory"][i]["personal"]) {
                tempArray.push(formData["personalHistory"][i]["personal"]);
            }
        }
        pres.findings.personalHistory = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["familyHistory"].length; i++) {
            if (formData["familyHistory"][i]["family"]) {
                tempArray.push(formData["familyHistory"][i]["family"]);
            }
        }
        pres.findings.familyHistory = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["examinations"].length; i++) {
            if (formData["examinations"][i]["exam"]) {
                tempArray.push(formData["examinations"][i]["exam"]);
            }
        }
        pres.findings.examinations = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["additionalFindings"].length; i++) {
            if (formData["additionalFindings"][i]["additional"]) {
                tempArray.push(formData["examinations"][i]["additional"]);
            }
        }
        pres.findings.additionalFindings = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["followUp"].length; i++) {
            if (formData["followUp"][i]["follow"]) {
                tempArray.push(formData["followUp"][i]["follow"]);
            }
        }
        pres.followUp = tempArray;

        tempArray = [];
        for (var i = 0; i < formData["patientResponse"].length; i++) {
            if (formData["patientResponse"][i]["response"]) {
                tempArray.push(formData["patientResponse"][i]["response"]);
            }
        }
        pres.patientResponse = tempArray;
        
        for (var i = 0; i < formData["testTypes"].length; i++) {
            if (formData["testTypes"][i]["testType"]) {
                pres.tests.push(formData["testTypes"][i]["testType"]);
            }
        }  

        tempArray = [];
        for (var i = 0; i < formData["medications"].length; i++) {
            var medicine = new Medication('');                   
            if (formData["medications"][i]) {                               
                medicine.tradeName = formData["medications"][i]["drugName"];
                medicine.dosage = formData["medications"][i]["dosage"];                                                                                           
                medicine.composition = null;
                pres.medications.push(medicine);                   
            }
        }               

        console.log('Save Prescription Model:')                  
        console.log(pres);
        console.log(JSON.stringify(pres));
        this.isExistingPatient = 0;
        this.existingPatientId = null;
        return pres;
    }    

    public displaySearchModal() {
            console.log("SearchInput : " + this.searchInput);
            this.SearchPatientByName(this.searchInput);
            this.modal.open('lg');
        }

    public closeSearchModal() {
        this.modal.close();
        this.selectedRow = -1;
    }
   
    SearchPatientByName(name: string) {
        this.patientFound = 0;
        return this.searchService.SearchPatientsByName(name).map(
            res => {                
                if (res.status === 200) {
                    this.data = res.json();
                    console.log(this.data);
                }
            }                                                              
        ).catch(error => {
            console.log(error);
            if (error.status === 404) {
                this.patientFound = -1;
            }
            this.prescriptionForm.reset();
            return Observable.throw(error);
            });      
    }
   
    public getSearchResults() {
        if (this.searchInput){
            this.isExistingPatient = 1;
            console.log("SearchInput : " + this.searchInput);
            this.getSearchResultsObs$ = this.SearchPatientByName(this.searchInput).subscribe
                (res => {
                    if (this.data.length == 1) {
                        this.existingPatientId = this.data[0].patientID;
                        this.getPatientPrescriptionById(this.data[0].patientID);
                    }
                    else {
                        console.log('In Else : ' + this.data)
                        console.log(this.data);
                        this.modal.open('lg');
                    }
                },
                () => {
                        
                });
        }                    
    }    

    getPatientNamesFromCache(): any {
        this.getPatientNamesObs$ = this.autoCompleteService.getPatientNamesFromCache().subscribe(
            data => {
                this.patientNamesCache = data;
                console.log(this.patientNamesCache);
            },
            err => {
                console.log("Error while retrieving cached Patient Names : " + err);
            },
            () => {
                console.log("Cached Patient Names retrieved successfully.");
            }
        )
    }

    getChamberNames(): any {
        this.getChambersObs$ = this.prescriptionService.getChamberNames().subscribe(
            data => {
                this.chamberNames = data;
                console.log(this.chamberNames);
            },
            err => {
                console.log("Error while retrieving Chamber Names : " + err);
            },
            () => {
                console.log("Chamber Names retrieved successfully.");
            }
        )
    }

    getTestsFromCache(): any {
        this.getTestsObs$ = this.autoCompleteService.getAllTestsfromCache().subscribe(
            data => {
                this.testCache = data;     
                console.log(this.testCache); 
                return data;          
            },
            err => {
                console.log("Error while retrieving cached Tests : " + err);
            },
            () => {
                console.log("Cached Tests retrieved successfully.");
            }
        )
    }

    getDrugsFromCache(): any {
        this.getDrugsObs$ = this.autoCompleteService.getAllDrugsfromCache().subscribe(
            data => {
                this.drugCache = data;
                console.log(this.drugCache);
                return data;
            },
            err => {
                console.log("Error while retrieving cached Drugs : " + err);
            },
            () => {
                console.log("Cached Drugs retrieved successfully.");
            }
        )
    }

    getCompositionByDrugName(med: Medication){
        var result : string[] = [];
        this.getCompositionObs$ = this.prescriptionService.getCompositionByDrugName(med.tradeName).subscribe(
            data => {  
                //console.log(data); 
                result = data; 
                med.composition = data;
                console.log(med.composition);                                                
            },
            err => {
                console.log("Error while retrieving composition for Drug : " + med.tradeName + "\n" + err);
                return [];
            },
            () => {
                med.composition = result;
                console.log("Composition retrieved successfully for Drug : " + med.tradeName);
                return med.composition;
            }            
        )
        return med.composition;
    }             

    public getSelectedRow(item: any, index: number) : any {
        this.selectedRow = index;
        console.log("Selected Row Index : " + this.selectedRow);        
        this.selectedPatient = item;
        console.log("Selected Val : ", this.selectedPatient);
        this.existingPatientId = item.patientID;        
        //this.modal.close();

        return this.selectedRow;
    }     

    getPatientPrescriptionById(id :any)
    {            
        //var response: any;
        this.getPatientObs$ = this.prescriptionService.getPatientPrescription(id).subscribe(
            data => {                
                console.log(data);               
                this.prescriptionModel = new Prescription(data);                
                console.log('Get Model:');
                console.log(this.prescriptionModel);    
                this.populatePrescriptionForm();
                this.loading = "fa-tasks";
                //this.hasLoaded = true;
            },
            err => {
                console.log("Error while retrieving Prescription : " + err);
                this.loading = "fa-tasks";
            },
            () => {
                console.log("Patient Prescription retrieved successfully.");
            }
        )
        //return response;
    }

    //Called on Select Button Click of Modal
    getPrescriptionData(patientId: any) {        
        this.getPatientPrescriptionById(patientId);        
        this.modal.close();
        this.selectedRow = -1;            
    }      

    patchFindings(controlName: string, data) {        
        if (controlName == 'chiefComplaints') {
            return this.fb.group({
                complaint: [data]
            });
        }
        else if (controlName == 'personalHistory') {
            return this.fb.group({
                personal: [data]
            });
        }
        else if (controlName == 'familyHistory') {
            return this.fb.group({
                family: [data]
            });
        }
        else if (controlName == 'examinations') {
            return this.fb.group({
                exam: [data]
            });
        }
        else if (controlName == 'additionalFindings') {
            return this.fb.group({
                additional: [data]
            });
        }
    }  

    patchTests(data) {        
        return this.fb.group({
            testType: [data]
        });               
    }  

    patchMedications(data) {
        return this.fb.group({
            drugName: [data.tradeName],
            dosage:[data.dosage]
        });
    }  

    patchMiscellaneous(controlName: string, data) {
        if (controlName == 'followUp') {
            return this.fb.group({
                follow: [data]
            });
        }
        else if (controlName == 'patientResponse') {
            return this.fb.group({
                response: [data]
            });
        }        
    }      

    populatePrescriptionForm() {
        //Letter Head :- 
        this.prescriptionForm.controls['chamberSelect'].setValue(this.prescriptionModel.letterhead.chamberName);

        //Patient Info :-
        this.prescriptionForm.controls['title'].setValue(this.prescriptionModel.patientInfo.title);
        this.prescriptionForm.controls['_name'].setValue(this.prescriptionModel.patientInfo.patientName);
        this.prescriptionForm.controls['age'].setValue(this.prescriptionModel.patientInfo.age);
        this.prescriptionForm.controls['parity'].setValue(this.prescriptionModel.patientInfo.parity);
        this.prescriptionForm.controls['bloodGroup'].setValue(this.prescriptionModel.patientInfo.bloodGroup);
        this.prescriptionForm.controls['phone'].setValue(this.prescriptionModel.patientInfo.contactNumber);
        this.prescriptionForm.controls['email'].setValue(this.prescriptionModel.patientInfo.email);        

        //Investigations :-
        const chiefComplaints = <FormArray>this.prescriptionForm.controls['chiefComplaints'];        
        for (let i = chiefComplaints.controls.length - 1; i >= 0; i--) {       
            chiefComplaints.removeAt(i);
        }
        if (this.prescriptionModel.findings.chiefComplaints) {    
            chiefComplaints.removeAt(0);        
            for (var item of this.prescriptionModel.findings.chiefComplaints) {
                chiefComplaints.push(this.patchFindings('chiefComplaints', item));
            }
        }

        const personalHistory = <FormArray>this.prescriptionForm.controls['personalHistory'];
        for (let i = personalHistory.controls.length - 1; i >= 0; i--) {
            personalHistory.removeAt(i);
        }
        if (this.prescriptionModel.findings.familyHistory) {
            personalHistory.removeAt(0);
            for (var item of this.prescriptionModel.findings.personalHistory) {
                personalHistory.push(this.patchFindings('personalHistory', item));
            }
        }

        const familyHistory = <FormArray>this.prescriptionForm.controls['familyHistory'];
        for (let i = familyHistory.controls.length - 1; i >= 0; i--) {
            familyHistory.removeAt(i);
        }
        if (this.prescriptionModel.findings.familyHistory) {
            familyHistory.removeAt(0);
            for (var item of this.prescriptionModel.findings.familyHistory) {
                familyHistory.push(this.patchFindings('familyHistory', item));
            }
        }

        const examinations = <FormArray>this.prescriptionForm.controls['examinations'];        
        //for (var i = 0; i < examinations.length; i++) {
        //    examinations.removeAt(i);
        //}     
        for (let i = examinations.controls.length - 1; i >= 0; i--) {
            examinations.removeAt(i);
        }   
        if (this.prescriptionModel.findings.examinations) { 
            examinations.removeAt(0);                       
            for (var item of this.prescriptionModel.findings.examinations) {
                examinations.push(this.patchFindings('examinations', item));
            }
        }

        const additionalFindings = <FormArray>this.prescriptionForm.controls['additionalFindings'];    
        for (let i = additionalFindings.controls.length - 1; i >= 0; i--) {
            additionalFindings.removeAt(i);
        }    
        if (this.prescriptionModel.findings.additionalFindings) {     
            additionalFindings.removeAt(0);       
            for (var item of this.prescriptionModel.findings.additionalFindings) {
                additionalFindings.push(this.patchFindings('additionalFindings', item));
            }
        }              

        //Tests :-
        const testTypes = <FormArray>this.prescriptionForm.controls['testTypes'];    
        for (let i = testTypes.controls.length - 1; i >= 0; i--) {
            testTypes.removeAt(i);
        }    
        if (this.prescriptionModel.tests && testTypes) {            
            testTypes.removeAt(0);                         
            for (var j = 0; j < this.prescriptionModel.tests.length; j++) {
                testTypes.push(this.patchTests(this.prescriptionModel.tests[j]));                             
            }            
        }

        //Medications :-
        const medications = <FormArray>this.prescriptionForm.controls['medications'];
        for (let i = medications.controls.length - 1; i >= 0; i--) {
            medications.removeAt(i);
        }
        if (this.prescriptionModel.medications) {
            medications.removeAt(0);
            for (var j = 0; j < this.prescriptionModel.medications.length; j++) {
                if (this.prescriptionModel.medications[j]){
                    medications.push(this.patchMedications(this.prescriptionModel.medications[j]));                    
                }
            }            
        }       

        //Miscellaneous :-
        const followUp = <FormArray>this.prescriptionForm.controls['followUp'];
        for (let i = followUp.controls.length - 1; i >= 0; i--) {
            followUp.removeAt(i);
        }
        if (this.prescriptionModel.followUp) {
            followUp.removeAt(0);
            for (var item of this.prescriptionModel.followUp) {
                followUp.push(this.patchMiscellaneous('followUp', item));
            }            
        }

        const patientResponse = <FormArray>this.prescriptionForm.controls['patientResponse'];
        for (let i = patientResponse.controls.length - 1; i >= 0; i--) {
            patientResponse.removeAt(i);
        }
        if (this.prescriptionModel.patientResponse) {
            patientResponse.removeAt(0);
            for (var item of this.prescriptionModel.patientResponse) {
                patientResponse.push(this.patchMiscellaneous('patientResponse', item));
            }
        }
        //Expand Panel : 
        this.isPanelLetterHeadOpen = false;
        this.toggleLetterHead();
        this.isPatientInfoOpened = false;   
        this.togglePatientInfo();             
    }

    ResetForm() {
        this.prescriptionForm.reset();
        this.isExistingPatient = 0;
        this.isPanelLetterHeadOpen = false;
        this.isPatientInfoOpened = false;
        this.isSuccess = 0;
        this.patientFound = 0;
        this.searchInput = null;
        this.selectedPatient = null;
        this.selectedRow = -1;
        this.existingPatientId = null;
    }    

    toggleLetterHead() {        
        this.isPanelLetterHeadOpen = !this.isPanelLetterHeadOpen;                    
    }
    togglePatientInfo() {
        this.isPatientInfoOpened = !this.isPatientInfoOpened;
    }   
    ngOnDestroy() {
        if (this.getChambersObs$) { this.getChambersObs$.unsubscribe(); }
        if (this.getCompositionObs$) { this.getCompositionObs$.unsubscribe(); }
        if (this.getDrugsObs$) { this.getDrugsObs$.unsubscribe(); }
        if (this.getPatientNamesObs$) { this.getPatientNamesObs$.unsubscribe(); }
        if (this.getPatientObs$) { this.getPatientObs$.unsubscribe(); }
        if (this.getTestsObs$) { this.getTestsObs$.unsubscribe(); }
        if (this.getSearchResultsObs$) { this.getSearchResultsObs$.unsubscribe(); }
        if (this.savePrescriptionObs$) { this.savePrescriptionObs$.unsubscribe(); }
    }   
}

