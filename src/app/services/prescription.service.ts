import {Injectable} from '@angular/core';
import { Prescription, PatientInfo, Findings } from '../models/index';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
//import { Prescription } from '../models/prescription.model';

@Injectable()
export class PrescriptionService {

    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo'; 
    constructor(private http: Http) {
    }
    getChamberNames() {
        console.log('getChamberNames Cache service invoked');

        return this.http.get(`${this.webApiBaseUrl}/GetChamberNames`)
            .map(res => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
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
    printPrescription(oModel: Prescription) {
        console.log('savePrescription service invoked');

        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(oModel);
        console.log(body);

        return this.http.post(`${this.webApiBaseUrl}/PrintPrescription`, body, { headers : headers, responseType: ResponseContentType.Blob })
            .map((res: Response) => {
                if (res) {
                    if (res.status === 200) {
                        console.log(res);
                        //return [{ status: res.status, json: res }] 
                        var byteCharacters = atob("JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9MZW5ndGggOTY0L0ZpbHRlci9GbGF0ZURlY29kZT4+c3RyZWFtCnicnVbbcqNGEH3nK/optams5blw074hwBIpJLAYO/YjlrCWFAIbk3U2X58BiVqxUs9SlstljLpP9+k+M92v2kxo3ASbmCC2GoErmxweuj/XNxwoA/GsfYLfxd/9a2lGzRMz+T/XB1+Md6SW9UFP3figo/HRiOMcfaHdaq/dL4M/5du5RiYGvGsU2p/1XOO2OTEtsJgN1CITzsEyoc60pDO+bXtCoUWjoBOwbBltL6NJb7ONdvim3mmfDlF3A2vraM2Akt6aoNZmZ31uI0mcZMFtu0t4yjDs+zBI5ovk5xC9o20cHCVTdU69g2VfzuvMjo6zM/WhXfy1KjP4gpm3nT41X1ZPeaGyJ0N7L/0Ov4HI9wofbvc1OYqoNTwzIn3F7WHhvLSR2DC9Nq4ZodZJ316l3Cz5KI+1ObXBYF0AKa/ngSZvhw0Gi2ChYkcE/kqA5wsnCBNMImDa0x7BGup05Sz9y27UtCeWoXB15ognm04nKsdZGEUezNfRXXwZQOdkwlQIsbMOxCNO17IRUTtlmcIsK4pMTRoF4ETJGQ/8h5oq6vjQfRARcTZaRCbXEREFq3s/EcFcailaKTRE+cRA+uEuAv8G3GgZh06wEghIX1yZ8WWubrV/KdK8bICqEQhWrR8IDCVi2DiR2F8n0coJYREkIlojEjumYUwxIuK9gudU3ktbeKmzXZmWmzx7U4OhCgiX8Rd4ONPBT6QMnNSNswzCx3GUTLQ3Wf0t36QFuJJMVsMVzOu03O6r5mtWqzF1jNniOgIvT5+yBitOy4xQhJf/IImtVLLtM+AYq9iRRJJ3eSHk5e5NPqvK3KNRjE+HtsjqMk/HYhE0s3uJIP7ZV7VaN7qNZpMWRVWPy0O3sDzmhezyRTYnF5Euj/TYi0hnBnIRLX0vcLt2omLQqY6IQawdzwd8nDHK2nUOB2hvrygJVOG73RBH8KIEnYlt7miv3bra5KU6b9TZIGS/gzit003WpPuq+AyseyXqdJ9uq0LNBsWl7X2SPhVZ8wbOcyOPvJeXJXbWJT/e76Dnw+/tJa9/QRD3ZleOZFb9+/0pK/+r8g2km3z7GfxN1aCgR3YK0MtC5ro5Wsi8v9fOhCzkPE0gXvuJuw5mvoeXjFtIfrOiqrby1N3VkrAjCeMYDOPYYzhuiHsTLIO7ZA5xVnzL28Mv7pPLBWNyHx9bMGZMsZMfJK4fhs7Kj+7wDYRxG59xURhGfwG2UR6vOYaOIuV87b3RMfJ4+OCZUxNbOI4bvNRKLMeYehdn6OQJmmw/WJr+Bw9zgwgKZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8L1R5cGUvUGFnZS9NZWRpYUJveFswIDAgNTk1IDg0Ml0vUGFyZW50IDUgMCBSL0NvbnRlbnRzIDQgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMyAzIDAgUi9GMiAyIDAgUi9GMSAxIDAgUj4+L1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldPj4+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvVGltZXMtQm9sZEl0YWxpYy9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL1BhZ2VzL0lUWFQoMS4zLjEuMCkvS2lkc1s2IDAgUl0vQ291bnQgMT4+CmVuZG9iago3IDAgb2JqCjw8L1BhZ2VzIDUgMCBSL1R5cGUvQ2F0YWxvZz4+CmVuZG9iago4IDAgb2JqCjw8L0NyZWF0aW9uRGF0ZShEOjIwMTcwOTA0MTkzMTEzKzAwJzAwJykvUHJvZHVjZXIoaVRleHRTaGFycC5MR1BMdjIuQ29yZSAxLjMuMS4wKS9Nb2REYXRlKEQ6MjAxNzA5MDQxOTMxMTMrMDAnMDAnKT4+CmVuZG9iagp4cmVmCjAgOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDEzMDkgMDAwMDAgbiAKMDAwMDAwMTQwNCAwMDAwMCBuIAowMDAwMDAxMjIxIDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMTQ5NyAwMDAwMCBuIAowMDAwMDAxMDQ2IDAwMDAwIG4gCjAwMDAwMDE1NjIgMDAwMDAgbiAKMDAwMDAwMTYwNyAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOS9JbmZvIDggMCBSL0lEIFs8ZjQ2ZTk0NzI5NGE2MWY4N2E3NjhkNGJhOTM4OGZmZDQ+PGE5MjBmM2MzM2UwOWZjMzA3MmVlZDM5ODc3YjdmY2E0Pl0vUm9vdCA3IDAgUj4+CnN0YXJ0eHJlZgoxNzM5CiUlRU9GCg==");
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([byteArray], { type: 'application/pdf' }); return blob;
                        //return new Blob([res.blob()], { type: 'application/pdf' }); 
                        
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
