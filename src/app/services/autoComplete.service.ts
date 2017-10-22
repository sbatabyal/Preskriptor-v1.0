import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { Prescription } from '../models/prescription.model';
import * as config from '../config/appSettings.json';

@Injectable()
export class AutoCompleteService {    
    public webApiBaseUrl: any = config['apiBaseUrl'];
    //public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo';
    public authHeader: any = 'Bearer ' + sessionStorage['authToken'];

    
    constructor(private http: Http){}
        
    getPatientNamesFromCache() {
        console.log('getPatientNamesFrom Cache service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Patients/Patient-Names`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }  

    getAllTestsfromCache() {
        console.log('getAllTestsfromCache service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Tests/Types`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    getAllDrugsfromCache() {
        console.log('getAllDrugsfromCache service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Drugs/Trade-Names`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    } 

    private handleServerError(error: Response) {
        console.error("An error occurred : " + error);
        return Observable.throw(error || 'Server error');
    }

}