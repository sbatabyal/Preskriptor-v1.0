export class PatientInfo {
    _name?: string; //required
    title: string;
    age: number;
    bloodGroup: string;
    email: string;
    phone: string;
    parity: string;

    constructor(json:any      
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
