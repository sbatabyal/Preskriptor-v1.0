import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../models/index'

@Injectable()
export class AuthenticationService {
    public static loginSuccess: boolean = false;
    constructor(private http: Http) { }    

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
            client_id: "1EH1COBONWikQYptgWhMJ2iVJnDuqhWk",
            client_secret: "YOR2gZ0visHgVrScNmTfSDMWq8VpWn9k51vgnP3v36H1HMc5saKCsFq2plzpxC2i"
        });

        return this.http.post('https://ritwikroy7.auth0.com/oauth/token', body , options).toPromise()
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