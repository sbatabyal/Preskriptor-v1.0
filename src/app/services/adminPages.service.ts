import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { Test, Drug } from '../models/prescription.model';
import * as config from '../config/appSettings.json';

@Injectable()
export class AdminPageService {    
    public drugs: Drug[];
    public webApiBaseUrl: any = config['apiBaseUrl'];
    public authHeader: any = 'Bearer ' + sessionStorage['authToken'];

    constructor(private http: Http) {        
    }      

    addNewTest(testData: any) {
        console.log('saveTestData service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);        
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(testData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/Tests`, body, options)
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

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(testData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/Drugs`, body, options)
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

        //let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(headerData);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/Letterheads`, body, options)
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Tests`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
        
    getAllDrugs(): Promise<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Drugs`, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleServerError);
    }

    getAllHeaders() {
        console.log('getAllHeaders service invoked');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Letterheads`, options)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }     

    deleteDrug(drugName: string) {
        console.log('deleteDrug service invoked');      

        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });                

        return this.http.delete(`${this.webApiBaseUrl}/Drugs/${drugName}`, options)            
            .subscribe((res: Response) => {
                console.log(res);                
            })            
    }    

    deleteTest(testName: string) {
        console.log('deleteTest service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(`${this.webApiBaseUrl}/Tests/${testName}`, options)
            .subscribe((res: Response) => {
                console.log(res);
            })
    }    

    deleteHeader(headerName: any) {
        console.log('deleteHeader service invoked');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.webApiBaseUrl}/Letterheads/${headerName}`, options)
            .subscribe((res: Response) => {
                console.log(res);
            })
    }    
    
    private handleServerError(error: Response)
    {
        console.error("An error occurred : " + error);
        return Observable.throw(error || 'Server error');
    }

    //deleteTest(test: any) {
    //    console.log('deleteTest service invoked');

    //    let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
    //    let body = JSON.stringify(test);
    //    let options = new RequestOptions({
    //        headers: headers,
    //        body: body
    //    });
    //    console.log(body);

    //    return this.http.delete(`${this.webApiBaseUrl}/DeleteTest`, options)
    //        .subscribe((res: Response) => {
    //            console.log(res);
    //        })
    //}      
}