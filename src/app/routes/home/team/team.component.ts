import { element } from 'protractor';
import { StatusLabelComponent } from './../../../shared/components/status-label/status-label.component';
import { ToolsModule } from './../../tools/tools.module';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import {
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';

@Component({
  selector: 'app-routes-home-team',
  templateUrl: './team.component.html',
})
export class RoutesHomeTeamComponent implements OnInit {
  constructor(private http: _HttpClient) {
    this.show = true;
  }

  //  revenue Data from json
  theMonth = new Date().getMonth();
  theYear = new Date().getFullYear();
  budgetTotal = 0;
  actualTotoal = 0;
  budgetMonth = 0;
  actualMonth = 0;
  monthData: any = [];
  jobinData: any = [];
  percentMonthRevenue = 0;
  percentYearRevenue = 0;
  timeChartData: any = [];

  latestUpdateDate: Date;
  totalLiveQuantity = 0;
  totalLiveAmount = 0;
  RevenueTitle = '';

  ProjectNos = 'Project Nos';
  loading = false;
  engineersList = [];
  workload = 0;
  projectNoPieData = [];

  totalTabs: any[] = [
    { key: 'Revenue', show: true },
    { key: 'Job in', show: false },
  ];
  chartIndex = 0;
  show = true;
  selectedIndexChange(idx: any) {
    if (idx === 1) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  engineerTabs: any = [];
  trendsData:any[]=[];
  trendsDataYear: any[] = [];
  trendsDataMonth:any[]=[];
  ngOnInit() {
    this.loading = true;

    zip(
      this.http.get('home/revenuestatus'),
      this.http.get(`biz/revenue/${this.theYear}`),
      this.http.get('biz/EngineersStatus'),
      this.http.get('biz/jobtrends/team', {
        from: '2019-01-01',
        to: '2019-06-01',
      }),
    ).subscribe(
      ([revenueMonth, revenueYear, engineers, trends]) => {
        console.log(trends);
        const temp1: any[] = [];
        const temp2: any[] = [];
        trends.Items.forEach(element => {
          temp1.push({
            x: format(Date.parse(element.TheDay), 'YYYY-MM-DD'),
            y: element.JobOpenCount,
          });
        });
        const beginDay = new Date(2019, 0, 1).getTime();
        const endDay = new Date().getTime();
        const dayCount = Math.abs(endDay - beginDay) / 1000 / 60 / 60 / 24;
        for (let i = 0; i < dayCount; i += 1) {
          let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
          let ss = temp1.find(n => n.x === format(theDay, 'YYYY-MM-DD'));
          if (ss) {
            temp2.push({
              x: format(theDay, 'YYYY-MM-DD'),
              y: ss.y,
            });
          } else {
            temp2.push({
              x: format(theDay, 'YYYY-MM-DD'),
              y: 0,
            });
          }
        }
        this.trendsDataYear = temp2;
        this.trendsData=this.trendsDataYear;
        this.actualMonth = revenueMonth.Items[0].amount;
        this.monthData = [];
        this.RevenueTitle = 'Revenue (' + revenueYear.unit + ')';
        const monthInt = new Date().getMonth();
        this.budgetMonth = revenueYear.data[monthInt].Budget;
        this.budgetTotal = [...revenueYear.data].reduce(
          (acc, cur) => acc + cur.Budget,
          0,
        );
        this.actualTotoal = [...revenueYear.data].reduce(
          (acc, cur) => acc + cur.Actual,
          0,
        );
        this.percentYearRevenue = Math.floor(
          (this.actualTotoal * 100) / this.budgetTotal,
        );
        this.percentMonthRevenue = Math.floor(
          (this.actualMonth * 100) / revenueYear.data[this.theMonth].Budget,
        );
        // for bar chart of revenue
        [...revenueYear.data].forEach(element => {
          if (this.monthData.length !== 12) {
            this.monthData.push({
              x: element.Month,
              y: element.Actual,
            });
          }
          // for bar chart of job in
          if (this.jobinData.length !== 12) {
            this.jobinData.push({
              x: element.Month,
              y: element.JobIn,
            });
          }
          // for timline chart
          if (this.timeChartData.length !== 24) {
            this.timeChartData.push({
              month: element.Month,
              valueType: 'actual',
              value: element.Actual,
            });
            this.timeChartData.push({
              month: element.Month,
              valueType: 'budget',
              value: element.Budget,
            });
          }
        });
        console.log(engineers);
        this.engineersList = engineers.Items;
        this.loading = false;
      },
      err => (this.loading = false),
      () => {
        const chart = new G2.Chart({
          container: 'lineChart',
          forceFit: true,
          height: 290,
          animate: false,
        });
        chart.source(this.timeChartData, {
          month: {
            range: [0, 1],
          },
        });
        chart.tooltip({
          crosshairs: {
            type: 'line',
          },
        });
        chart.axis('value', {
          label: {
            formatter: function formatter(val) {
              return val + '￥';
            },
          },
        });
        chart
          .line()
          .position('month*value')
          .color('valueType');
        chart
          .point()
          .position('month*value')
          .color('valueType')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1,
          });
        chart.render();
      },
    );
  }

  engIdx = 0;
  selectChange(idx: number) {
    // if (this.totalTabs[idx].show !== true) {
    //   this.totalTabs[idx].show = true;
    //   this.cdr.detectChanges();
    // }
    console.log('change');
  }
  engChange(index: number) {}
  trendType='Trend of This Month';
  JobinChartChange(){
    const firstDayofThisMonth=new Date(new Date().getFullYear(),new Date().getMonth(),1);
    const dayCount = Math.abs(new Date().getTime() - firstDayofThisMonth.getTime()) / 1000 / 60 / 60 / 24;
    if(this.trendType==='Trend of This Month'){
      this.trendsDataMonth=this.trendsDataYear.slice(-dayCount);
      this.trendsData=this.trendsDataMonth;
      this.trendType='Trend of This Year';
    }else{
      this.trendsData=this.trendsDataYear;
      this.trendType='Trend of This Month';
    }
    console.log(this.trendsDataMonth);
    
    

  }
}
