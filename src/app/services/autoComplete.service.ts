import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { Prescription } from '../models/prescription.model';

@Injectable()
export class AutoCompleteService {
    //public webApiBaseUrl = 'http://localhost:11669/api/patient';
    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo';
    
    constructor(private http: Http) { }

    getPatientNamesFromCache() {
        console.log('getPatientNamesFrom Cache service invoked');
        
        return this.http.get(this.webApiBaseUrl)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }  

    getAllTestsfromCache() {
        console.log('getAllTestsfromCache service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetTestList`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    getAllDrugsfromCache() {
        console.log('getAllDrugsfromCache service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetDrugNames`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    //getPatientNames(): Promise<any> {
    //    console.log('service invoked');

    //    var result = this.http.get(this.webApiBaseUrl)
    //        .toPromise()
    //        .then(response => response.json())
    //        .catch(this.handleError);

    //    console.log("From service");
    //    console.log(result);
    //    return result;
    //} 

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    } 

    private handleServerError(error: Response) {
        console.error("An error occurred : " + error);
        return Observable.throw(error || 'Server error');
    }

}