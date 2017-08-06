import { HeaderDetails } from './header.model';
import { PatientInfo } from './patient.model';
import { Recommendations } from './recommendation.model';
import { Findings } from './findings.model';

export class PrescriptionOld
{
    header: HeaderDetails;
    info: PatientInfo;
    findings: Findings;
    recommendtions: Recommendations;  

    constructor(json: any)
    {
        if (json)
        {
            this.header = json.header;
            this.info = json.info;
            this.findings = json.findings;
            this.recommendtions = json.recommendations;
        }
    }
}
