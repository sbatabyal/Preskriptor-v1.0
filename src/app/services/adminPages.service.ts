import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Test, Drug } from '../models/prescription.model';

@Injectable()
export class AdminPageService {
    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo';
    public drugs: Drug[];

    constructor(private http: Http) { }      

    addNewTest(testData: any) {
        console.log('saveTestData service invoked');

        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(testData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/SaveTest`, body, options)
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

    addNewDrug(testData: any) {
        console.log('saveTestData service invoked');

        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(testData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/SaveDrug`, body, options)
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

    addNewHeader(headerData: any) {
        console.log('addNewHeader service invoked');

        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(headerData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/SaveHeader`, body, options)
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

    getAllTests() {
        console.log('getAllTests service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetTestList`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    
    //getAllDrugs(): any {
    //    console.log('getAllDrugs service invoked');
       
    //    return this.http.get(`${this.webApiBaseUrl}/GetDrugList`)
    //        .map(res => {                               
    //            console.log(res.json());
    //            return res.json();
    //        })
    //        .catch(error => {
    //            console.log(error);
    //            return Observable.throw(error);
    //        });                
    //}   

    getAllDrugs(): Promise<any> {
        return this.http.get(`${this.webApiBaseUrl}/GetDrugList`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleServerError);
    }

    getAllHeaders() {
        console.log('getAllHeaders service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetHeaderList`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }         
    
    private handleServerError(error: Response)
    {
        console.error("An error occurred : " + error);
        return Observable.throw(error || 'Server error');
    }
      
}