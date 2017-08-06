import { PatientMedication } from './patientMedication.model';

export class Recommendations {
    tests: string[];
    medications: PatientMedication[];
    followUp: string[];
    patientResponse: string[];
    //misc: string[];
}

export class Test {
    type: string;
    subTypes: string[];

    constructor(json: any) {
        if (json) {
            this.type = json.type;
            this.subTypes = json.subTypes;            
        }
    }
    
}

