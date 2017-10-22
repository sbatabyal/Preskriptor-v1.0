import {Injectable} from '@angular/core';
import { Prescription, Patient, Findings } from '../models/index';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as config from '../config/appSettings.json';


@Injectable()
export class PrescriptionService {

    public webApiBaseUrl: any = config['apiBaseUrl'];
    public authHeader: any = 'Bearer ' + sessionStorage['authToken'];
    constructor(private http: Http) {        
    }
    getChamberNames() {
        console.log('getChamberNames Cache service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Letterheads/Chamber-Names`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    getPatientPrescription(id: string) {
        console.log('getPatientPrescription service invoked with Patient Id : ' + id);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });


        return this.http.get(`${this.webApiBaseUrl}/Prescriptions/${id}`, options)
            //return this.http.get('assets/data.json')
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    
    savePrescription(oModel: Prescription) {
        console.log('savePrescription service invoked');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(oModel);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/Prescriptions`, body, options)
            .map((res: Response) => {
                if (res) {
                    if (res.status === 200) {
                        console.log(res.status);
                        return [{ status: res.status, json: res }]
                    }
                }
            })
            .catch(error => {
                console.log(error);
                return Observable.throw(error || 'Server Error');
            });
    }    

    SaveAndPrintPrescription(oModel: Prescription) {
        console.log('savePrescription service invoked');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(oModel);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/Prescriptions/PDF`, body, { headers : headers, responseType: ResponseContentType.Blob })
            .map((res: Response) => {
                if (res) {
                    if (res.status === 200) {
                        console.log(res);
                        console.log(res["fileContents"]);
                        return new Blob([res.blob()], { type: 'application/pdf' }); 
                        
                    }
                }
            })
            .catch(error => {
                console.log(error);
                return Observable.throw(error || 'Server Error');
            });
    }

    getCompositionByDrugNameBkp(name : string) : Observable<string[]> {
        console.log('getCompositionByDrugName service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/GetComposition?TradeName=${name}`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    } 

    getCompositionByDrugName(name: string): Observable<string[]> {
        console.log('getCompositionByDrugName service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Drugs/${name}`, options)            
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    } 
  
}
