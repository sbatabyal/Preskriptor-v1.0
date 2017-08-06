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

export class PatientMedication extends Drug {
    dosage: string;
}



