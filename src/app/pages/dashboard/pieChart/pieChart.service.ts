import {Injectable} from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { JwtHelper } from 'angular2-jwt';
import * as config from '../../../config/appSettings.json';

@Injectable()
export class PieChartService {

    public jwtHelper: JwtHelper = new JwtHelper();
    public webApiBaseUrl: any = config['apiBaseUrl'];
    public authHeader: any = 'Bearer ' + sessionStorage['authToken'];  
    public count: any = 0;
    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {  
        //this.count = this.getPatientCount();     
        console.log(this.getPatientCount()[0]);   
  }

    getPatientCount(): any{      
        let headers = new Headers();
        headers.append('Content-Type', 'application/json ; charset=utf-8');
        headers.append('Authorization', `${this.authHeader}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.webApiBaseUrl}/Patients/Count`, options).toPromise()
          .then(res => {
              var result = res.json();              
              console.log(result);
              if (res.status === 200)
              {
                  return result;
              }
              else
              {
                  return "Unable to fetch Patient Count";
              }             
          })
          .catch(error => {
              console.log(error);
              return "Unable to fetch Patient Count";
          });

  }

  async getData() {             
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;                            
    var chart = [
        {
        //icons : money, face, person, refresh
        color: pieColor,
        description: 'dashboard.current_user',        
        //stats: this.jwtHelper.decodeToken(sessionStorage['authToken']).Name,
        stats: this.jwtHelper.decodeToken(sessionStorage['idToken']).nickname,
        icon: 'person',
        },
        {
        color: pieColor,
        description: 'dashboard.total_patients',        
        stats: await this.getPatientCount(),
        icon: 'face',
      }
    ];

    return chart;
  }

  getCurrentUserData()
  {
      var token = sessionStorage['authToken'];
      var currentUser;
      if (!this.jwtHelper.isTokenExpired) {
          currentUser = this.jwtHelper.decodeToken(token).Name;
      }
      return currentUser;
  }

  getPatientCount1()
  {
      return 2500;
  }
}
