//import { HeaderDetails } from './header.model';

export class Prescription {
    header: Header;
    date: string;    
    name: string;
    title: string;
    id: string;
    age: number;
    bloodGroup: string;
    email: string;
    contactNumber: string;
    parity: string;      
    findings: Findings;
    tests: Test[];
    medications: Medication[];
    followUp: string[];
    patientResponse: string[];

    constructor(json: any) {
        if (json) {
            this.header = json.header;
            this.id = json.id;
            this.date = json.date;
            this.age = json.age;
            this.bloodGroup = json.bloodGroup;
            this.email = json.email;
            this.name = json.name;
            this.contactNumber = json.contactNumber;
            this.title = json.title;
            this.parity = json.parity;
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

export class Header {
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
    dayTime: string;   

    constructor(json: any) {
        if (json) {
            this.doctorName = json.doctorName;
            this.degree = json.degree;
            this.email = json.Email;
            this.specialization = json.specialization;
            this.chamberName = json.chamberName;
            this.chamberAddressLine1 = json.chamberAddressLine1;
            this.chamberAddressLine2 = json.chamberAddressLine2;
            this.chamberAddressLine3 = json.chamberAddressLine3;
            this.fax = json.fax;
            this.mobile = json.mobile;
            this.website = json.website;
            this.dayTime = json.dayTime;            
        }

    } 
}

export class PatientInfo {
    _name?: string; //required
    title: string;
    id: string;
    age: number;
    bloodGroup: string;
    email: string;
    phone: string;
    parity: string;    

    constructor(json: any
    ) {
        if (json) {
            this.age = json.Age;
            this.bloodGroup = json.BloodGroup;
            this.email = json.Email;
            this._name = json.Name;
            this.phone = json.ContactNumber;
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
            //for (var item in json.composition) {
            //    this.composition.push(item);
            //}
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

