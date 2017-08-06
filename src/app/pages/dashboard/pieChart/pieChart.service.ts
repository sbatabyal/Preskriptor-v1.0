import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
      let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
      let count: any;
      count = this.getPatientCount()
    return [
        {
        //icons : money, face, person, refresh
        color: pieColor,
        description: 'dashboard.current_user',
        //stats: '57,820',
        stats:['Shibani Batabyal'],
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
  { }

  getPatientCount()
  {
      return 2500;
  }
}
