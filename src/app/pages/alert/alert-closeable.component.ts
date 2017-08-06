import { Input, Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngbd-alert-closeable',
    templateUrl: './alert-closeable.html',
    styleUrls: ['./alert-closeable.css']
})
export class NgbdAlertCloseable implements OnInit {

    @Input() alertType: string;
    @Input() alertMessage: string;  
    public alerts: Array<Alert> = [];       

    constructor() {               
    }

    ngOnInit() {
        this.alerts = new Array<Alert>();
        this.alerts.push({
            type: this.alertType,
            message: this.alertMessage,
        });        
    }

    public closeAlert(alert: Alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }    
}

export class Alert {    
    type: string;
    message: string;
}
