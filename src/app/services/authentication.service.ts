import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../models/index';
import * as config from '../config/appSettings.json';

@Injectable()
export class AuthenticationService {
    public static loginSuccess: boolean = false;  
    public auth0Url: any = config['auth0Url'];
    public clientId: any = config['clientID'];
    public clientSecret: any = config['clientSecret'];
    
    constructor(private http: Http) {        
        console.log(this.auth0Url);
    }    

    logout() {
        // remove user from session storage to log user out
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('idToken');
        AuthenticationService.loginSuccess = false;
    }

    //login(email: string, password: string) {    
    //    let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
    //    let options = new RequestOptions({ headers: headers });
    //    return this.http.post('http://localhost:27729/api/TokenAuth', JSON.stringify({ Email: email, Password: password }), options).toPromise()
    //        .then(function (response) {
    //            var result = response.json();
    //            if (result.State == 1) {
    //                var json = result.Data;
    //                console.log(result);
    //                sessionStorage.setItem("authToken", json.accessToken);
    //                AuthenticationService.loginSuccess = true;
    //            }
    //            else { AuthenticationService.loginSuccess = false;}                
    //            return result;
    //        });         
    //}

    login(email: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            grant_type: "password", username: email, password: password, audience: "https://api.preskriptor.com",
            scope: "openid",
            client_id: this.clientId,
            client_secret: this.clientSecret
        });

        //return this.http.post('https://ritwikroy7.auth0.com/oauth/token', body , options).toPromise()
        return this.http.post(this.auth0Url, body, options).toPromise()
            .then(function (response) {
                var result = response.json();
                if (response.status === 200) {
                    var json = result.Data;
                    console.log(result);
                    sessionStorage.setItem("authToken", result.access_token);
                    sessionStorage.setItem("idToken", result.id_token);
                    AuthenticationService.loginSuccess = true;
                }
                else { AuthenticationService.loginSuccess = false; }
                return response;
            });
    }

    register(user : User) {
        let headers = new Headers({ 'Content-Type': 'application/json ; charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ Email: user.email, Password: user.password, Name: user.name });
        return this.http.post('http://localhost:27729/api/TokenAuth', body, options)    
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
}