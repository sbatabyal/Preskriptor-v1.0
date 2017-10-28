import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import { Prescription } from '../models/prescription.model';
import * as config from '../config/appSettings.json';

@Injectable()
export class SearchService {
    public webApiBaseUrl: any = config['apiBaseUrl']; 
    public authHeader: any = 'Bearer ' + sessionStorage['authToken'];   
    
    constructor(private http: Http) {        
    }      

    SearchPatientsByName(name: string)
    {
        console.log('SearchPatientsByName service invoked...');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Patients/Search/${name}`, options)
           //return this.http.get('assets/data.json')
            .map(res => res)
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