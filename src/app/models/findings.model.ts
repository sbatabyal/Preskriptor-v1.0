export class Findings
{
    chiefComplaints: string[];
    personalHistory: string[];
    familyHistory: string[];
    examinations: Examinations[];
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
