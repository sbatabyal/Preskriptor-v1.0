import {Injectable} from '@angular/core';
import { Prescription, PatientInfo, Findings } from '../models/index';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
//import { Prescription } from '../models/prescription.model';

@Injectable()
export class PrescriptionService {

    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo'; 
    constructor(private http: Http) {
    }

    getPatientPrescription(id: string) {
        console.log('getPatientPrescription service invoked with Patient Id : ' + id);

        return this.http.get(`${this.webApiBaseUrl}/GetPrescription/${id}`)
            //return this.http.get('assets/data.json')
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }


    //getPatientPrescription1(name : string) : Observable<Prescription[]> {
    //    console.log('getPatientDetails service invoked');
    //    let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
    //    let options = new RequestOptions({ headers : headers });
    //    return this.http.get(this.webApiBaseUrl, options)
    //        .map((response: Response) => {
    //            return new Prescription(response.json())
    //        })
    //        .catch(error => {
    //            console.log(error);
    //            return Observable.throw(error);
    //        });
    //}

    savePrescription(oModel: Prescription) {
        console.log('savePrescription service invoked');

        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(oModel);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/SavePrescription`, body, options)
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

    getCompositionByDrugNameBkp(name : string) : Observable<string[]> {
        console.log('getCompositionByDrugName service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetComposition?TradeName=${name}`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    } 

    getCompositionByDrugName(name: string): Observable<string[]> {
        console.log('getCompositionByDrugName service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetComposition?TradeName=${name}`)            
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    } 
  
}
