import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { Prescription } from '../models/prescription.model';

@Injectable()
export class SearchService {
    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo/ByName';
    //public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo';
    
    
    constructor(private http: Http) { }

    //getPatientNamesFromCache() {
    //    console.log('service invoked');
        
    //    return this.http.get(this.webApiBaseUrl)
    //        .map(res => res.json())
    //        .catch(error => {
    //            console.log(error);
    //            return Observable.throw(error);
    //        });
    //}  

    SearchPatientsByName(name: string)
    {
        console.log('SearchPatientsByName service invoked...');

        return this.http.get(`${this.webApiBaseUrl}?Name=${name}`)
           //return this.http.get('assets/data.json')
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