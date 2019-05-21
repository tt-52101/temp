import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-routes-home-team-revenuechart',
  templateUrl: './revenuechart.component.html',
})
export class RoutesHomeTeamRevenuechartComponent implements OnInit {
  monthlyRevenue = [];
  constructor(private http: _HttpClient) {
   
  }
  monthJobinData:any=[];
  ngOnInit() {
    this.http.get('biz/revenue').subscribe(
      res=>{
        this.monthJobinData=[];
       
        [...res.data].forEach(element => {
          if(this.monthJobinData.length!==12){
            this.monthJobinData.push({
              x:element.Month,
              y:element.Actual
            });
          }

        });
      },err=>{},
      ()=>{
        
      }
    )
  }
}
