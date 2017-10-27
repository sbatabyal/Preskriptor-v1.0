//import { HeaderDetails } from './header.model';

export class Prescription {
    letterhead: Letterhead;
    prescriptionDate : string;        
    prescriptionID: string;
    patientInfo: Patient;    
    findings: Findings;
    tests: Test[];
    medications: Medication[];
    followUp: string[];
    patientResponse: string[];

    constructor(json: any) {
        if (json) {
            this.letterhead = json.letterhead;
            this.prescriptionID = json.prescriptionID;
            this.prescriptionDate = json.prescriptionDate;
            this.patientInfo = json.patientInfo;
            if (json.findings) {
                this.findings = new Findings();
                this.findings.additionalFindings = json["findings"]["additionalFindings"];
                this.findings.chiefComplaints = json["findings"]["chiefComplaints"];
                this.findings.examinations = json["findings"]["examinations"];
                this.findings.familyHistory = json["findings"]["familyHistory"];
                this.findings.personalHistory = json["findings"]["personalHistory"];                
            } 
            if (json.followUp) {
                this.followUp = json.followUp;                
            } 
            if (json.medications) {                
                this.medications = json.medications;                
            }   
            if (json.patientResponse) {
                this.patientResponse = json.patientResponse;                
            }        
            if (json.tests) {
               this.tests = json.tests;                
            }   
            
        }
    }
}

export class Letterhead {
    doctorName: string;
    degree: string;
    specialization: string;
    chamberName: string;
    chamberAddressLine1: string;
    chamberAddressLine2: string;
    chamberAddressLine3: string;
    chamberPhone: string;
    fax: string;
    mobile: string;
    email: string;
    website: string;
    timings: string;   

    constructor(json: any) {
        if (json) {
            this.doctorName = json.doctorName;
            this.degree = json.degree;
            this.email = json.email;
            this.specialization = json.specialization;
            this.chamberName = json.chamberName;
            this.chamberAddressLine1 = json.chamberAddressLine1;
            this.chamberAddressLine2 = json.chamberAddressLine2;
            this.chamberAddressLine3 = json.chamberAddressLine3;
            this.chamberPhone = json.chamberPhone;
            this.fax = json.fax;
            this.mobile = json.mobile;
            this.website = json.website;
            this.timings = json.timings;            
        }

    } 
}

export class Patient {
    patientName?: string; //required
    title: string;
    patientID : string;
    age: number;
    bloodGroup: string;
    email: string;
    phone: string;
    parity: string; 
    contactNumber: string;   

    constructor(json: any
    ) {
        if (json) {
            this.patientID = json.patientID;
            this.age = json.Age;
            this.bloodGroup = json.BloodGroup;
            this.email = json.Email;
            this.patientName = json.patientName ;
            this.contactNumber = json.ContactNumber;
            this.title = json.Title;
            this.parity = json.Parity;            
        }

    }
}
export class Findings {
    chiefComplaints: string[];
    personalHistory: string[];
    familyHistory: string[];
    examinations: string[];
    additionalFindings: string[];
}

export class Examinations {
    type: string;
    items: string[];

    constructor(json: any) {
        if (json) {
            this.type = json.type;
            this.items = json.items;
        }
    }
}
export class Test {
    type: string;    
    constructor(json: any) {
        if (json) {
            this.type = json.type;            
        }
    }

}   
export class Drug {
    tradeName: string;
    composition: string[];

    constructor(json: any) {
        if (json) {
            this.tradeName = json.tradeName;
            this.composition = json.composition;            
        }
    }
}

export class Medication extends Drug {
    dosage: string;
    constructor(json: any)
    {
        super(json);        
        this.dosage = json.dosage;
    }
}

