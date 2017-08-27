import {Injectable} from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class PieChartService {

    public jwtHelper: JwtHelper = new JwtHelper();
    public webApiBaseUrl = 'http://54.202.87.150/api/Dynamo'; 
    public count: any;
    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {        
  }

  getPatientCount1() : any{      
      return this.http.get(`${this.webApiBaseUrl}/GetPatientCount`)
          .map(res => res.json())
          .catch(error => {
              console.log(error);
              return error;
          });

  }

  getData() {           
      let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;      
      let count: any;    
      count = this.getPatientCount();  
      console.log(count);
    return [
        {
        //icons : money, face, person, refresh
        color: pieColor,
        description: 'dashboard.current_user',        
        stats: this.jwtHelper.decodeToken(sessionStorage['authToken']).Name,
        icon: 'person',
        },
        {
        color: pieColor,
        description: 'dashboard.total_patients',        
        stats: count,
        icon: 'face',
      }
    ];
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

  getPatientCount()
  {
      return 2500;
  }
}
