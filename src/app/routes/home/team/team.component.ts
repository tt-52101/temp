import { element } from 'protractor';
import { StatusLabelComponent } from './../../../shared/components/status-label/status-label.component';
import { ToolsModule } from './../../tools/tools.module';
import { map, zip } from 'rxjs/operators';
import {
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { Observable } from 'rxjs';
import { LineChartOutline } from '@ant-design/icons-angular/icons/public_api';
import { G2CustomComponent } from '@delon/chart';

@Component({
  selector: 'app-routes-home-team',
  templateUrl: './team.component.html',
})
export class RoutesHomeTeamComponent implements OnInit {
  constructor(private http: _HttpClient) {
    this.show = true;
    console.log('constructor');
    console.log(this.show);
  }
  // project查询参数
  params: any = {
    CurrentPage: 1,
    PageSize: 20,
    IsDeleted: false,
    IsIncludeAll: true,
    IsFinished: false,
    EngineerName: '',
    EngineeringCSName: '',
    AssistEngineerName: '',
    SalesCSName: '',
    SalesName: '',
    ServiceName: '',
    ClientName: '',
    OpenDateFrom: '',
    OpenDateTo: '',
    CompleteDateFrom: '',
    CompleteDateTo: '',
  };
  //  revenue Data from json
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
  workload=0;
  projectNoPieData = [];

  totalTabs: any[] = [
    { key: 'Revenue', show: true },
    { key: 'Job in', show: false },
  ];
  chartIndex=0;
  show = true;
  selectedIndexChange(idx: any) {
    if (idx === 1) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  engineerTabs: any = [];

  ngOnInit() {
    this.getRevenueJson().subscribe(
      res => {
        this.monthData = [];
        this.RevenueTitle = 'Revenue (' + res.unit + ')';
        const monthInt = new Date().getMonth();
        this.budgetMonth = res.data[monthInt].Budget;
        this.budgetTotal = [...res.data].reduce(
          (acc, cur) => acc + cur.Budget,
          0,
        );
        this.actualTotoal = [...res.data].reduce(
          (acc, cur) => acc + cur.Actual,
          0,
        );
        this.percentYearRevenue = Math.floor(
          (this.actualTotoal * 100) / this.budgetTotal,
        );
        this.percentMonthRevenue = Math.floor((134 * 100) / this.budgetMonth);
        // for bar chart of revenue
        [...res.data].forEach(element => {
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
              y: element.Budget,
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
      },
      err => {},
      () => {
        console.log(this.timeChartData);
      },
    );

    // fetching existing engineer status
    this.http.get('home/EngineersStatus').subscribe(
      res=>{
        this.engineersList=res.Items;
      }
    )
  }
  render(el: ElementRef) {
    // fetch dbstatus
    this.getDBStatus().subscribe(res => {
      this.latestUpdateDate = res.LastUpdateTime;
      this.totalLiveQuantity = res.LiveCount;
      this.totalLiveAmount = res.LiveAmount;
    });
    console.log('before render');
    const chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 290,
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
          return val + '$';
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
    console.log('after render');
    console.log(this.show);
  }
  getDbStatus() {
    return this.http.get('home/dbstatus');
  }
  getRevenueJson() {
    return this.http.get('biz/revenue/2019');
  }
  getExistEngineers() {
    return this.http.get('biz/engineers');
  }
  getDBStatus() {
    return this.http.get('home/dbstatus');
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
  format(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }
}
