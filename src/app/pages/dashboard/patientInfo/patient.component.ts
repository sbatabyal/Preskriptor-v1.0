import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PrescriptionService, AutoCompleteService } from '../../../services/index';
import { Prescription } from '../../../models';
import { PatientInfo } from '../../../models/patient.model';


@Component({
    selector: 'prescription-form',
    templateUrl: './prescriptionForm.html',
    styleUrls: ['./collapse.css'],
    providers: [PrescriptionService, AutoCompleteService]
})


export class PrescriptionFormComponent implements OnInit {

    public static cc_ControlCount = 1;
    public static fh_ControlCount = 1;
    public static ph_ControlCount = 1;
    public static ex_ControlCount = 1;
    public static af_ControlCount = 1;

    public prescriptionForm: FormGroup; // model driven form   
    public submitted: boolean; // keep track on whether form is submitted
    //protected names = ['Shibani', 'Ritwik', 'Karn', 'abcd', 'pqrs'];
    protected names = [];
    public patientsCache = [];// this.getExistingPatientNames();
    
    protected prescription: Prescription;
    constructor(private fb: FormBuilder, private autoCompleteService: AutoCompleteService) {

        jQuery(document).ready(() => {
            this.addChiefComplaintsDynamic();
            this.addPersonalHistoryDynamic();
            this.addFamilyHistoryDynamic();
            this.addExaminationsDynamic();
            this.addFindingsDynamic();            
        });  

        
    }
    ngOnInit() {

        this.prescription = new Prescription('[]');

        //this.patientsCache = this.getPatientNamesFromCache();
                
        // we will initialize our form model here
        
        this.prescriptionForm = this.fb.group({
            'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            '_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
    }

    save(model: Prescription, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

    getPatientNamesFromCache() : any {        
        this.autoCompleteService.getPatientNamesFromCache().subscribe(

            data => {

                this.patientsCache = data;
                console.log(this.patientsCache);                                
            },
            err => {
                console.log("Error while retrieving caches Pathent Names : " + err);
            },
            () => {
                console.log("Cached Patient Names retrieved successfully.");
            }            
        )
    }    

    getPatientDetails(patientName: string)
    { }

    addChiefComplaintsDynamic() {
        var next = PrescriptionFormComponent.cc_ControlCount;
        $("#Cc_field" + next).keypress(function (e) {
        
        var addto = "#Cc_field" + next;
        next = next + 1;
        var nextCntrl = "#Cc_field" + next;

        PrescriptionFormComponent.cc_ControlCount = next;
        console.log(PrescriptionFormComponent.cc_ControlCount);
        var newIn = '<input class="form-control" id="Cc_field' + next + '" name="chiefComplaintField' + next + '" type="text" style="margin-bottom : 5px;">';
        var newInput = $(newIn);

        $(addto).after(newInput);

        $("#Cc_field" + next).attr('data-source', $(addto).attr('data-source'));
        //$("#count").val(next);        
        $(addto).off("keypress");

    });
    }

    addPersonalHistoryDynamic() {
        var next = PrescriptionFormComponent.ph_ControlCount;
        $("#Ph_field" + next).keypress(function (e) {

            var addto = "#Ph_field" + next;
            next = next + 1;
            var nextCntrl = "#Ph_field" + next;

            PrescriptionFormComponent.ph_ControlCount = next;
            console.log(PrescriptionFormComponent.ph_ControlCount);
            var newIn = '<input class="form-control" id="Ph_field' + next + '" name="personalHistoryField' + next + '" type="text" style="margin-bottom : 5px;">';
            var newInput = $(newIn);

            $(addto).after(newInput);

            $("#Ph_field" + next).attr('data-source', $(addto).attr('data-source'));            
            $(addto).off("keypress");

        });
    }

    addFamilyHistoryDynamic() {
        var next = PrescriptionFormComponent.fh_ControlCount;
        $("#Fh_field" + next).keypress(function (e) {

            var addto = "#Fh_field" + next;
            next = next + 1;
            var nextCntrl = "#Fh_field" + next;

            PrescriptionFormComponent.fh_ControlCount = next;
            console.log(PrescriptionFormComponent.fh_ControlCount);
            var newIn = '<input class="form-control" id="Fh_field' + next + '" name="familyHistoryField' + next + '" type="text" style="margin-bottom : 5px;">';
            var newInput = $(newIn);

            $(addto).after(newInput);

            $("#Fh_field" + next).attr('data-source', $(addto).attr('data-source'));           
            $(addto).off("keypress");

        });
    }

    addExaminationsDynamic() {
        var next = PrescriptionFormComponent.ex_ControlCount;
        $("#Ex_field" + next).keypress(function (e) {

            var addto = "#Ex_field" + next;
            next = next + 1;
            var nextCntrl = "#Ex_field" + next;

            PrescriptionFormComponent.ex_ControlCount = next;
            console.log(PrescriptionFormComponent.ex_ControlCount);
            var newIn = '<input class="form-control" id="Ex_field' + next + '" name="examinationField' + next + '" type="text" style="margin-bottom : 5px;">';
            var newInput = $(newIn);

            $(addto).after(newInput);

            $("#Ex_field" + next).attr('data-source', $(addto).attr('data-source'));            
            $(addto).off("keypress");

        });
    }

    addFindingsDynamic() {
        var next = PrescriptionFormComponent.af_ControlCount;
        $("#Af_field" + next).keypress(function (e) {

            var addto = "#Af_field" + next;
            next = next + 1;
            var nextCntrl = "#Af_field" + next;

            PrescriptionFormComponent.af_ControlCount = next;
            console.log(PrescriptionFormComponent.af_ControlCount);
            var newIn = '<input class="form-control" id="Af_field' + next + '" name="findingsField' + next + '" type="text" style="margin-bottom : 5px;">';
            var newInput = $(newIn);

            $(addto).after(newInput);

            $("#Af_field" + next).attr('data-source', $(addto).attr('data-source'));            
            $(addto).off("keypress");

        });
    }

}
