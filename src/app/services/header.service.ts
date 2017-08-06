import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { HeaderDetails } from '../models/index';

@Injectable()
export class HeaderService {
    public webApiBaseUrl = '';
    //allHeaders: HeaderDetails[];
    constructor(private http: Http) { }
    
    getAllHeaders(): Observable<HeaderDetails[]> {
        return Observable.create(observer => {
            this.http.get(`${this.webApiBaseUrl}/get/`).map(response => response.json());
        })
        .catch(this.handleServerError);
    }

    //getAllHeaders(): Observable<HeaderDetails[]> {
    //    return this.http.get(`${this.webApiBaseUrl}/get/`)
    //        .map(response => response.json())        
    //        .catch(this.handleServerError);
    //} 

    addNewHeader()
    { }

    private handleServerError(error: Response)
    {
        console.error("An error occurred : " + error);
        return Observable.throw(error || 'Server error');
    }
      
}