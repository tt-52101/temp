import { zip } from 'rxjs';

import { Component, OnInit, Inject, Input } from '@angular/core';
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

  // four blocks
  // block 1 年度完成revenue
  percentYearRevenue = 0;
  budgetTotal = 0;
  actualTotoal = 0;
  // block 2 年度Job In
  jobInData: any[] = [];
  jobInDataYear: any[] = [];
  jobInYTD = 0;
  // block 3 月度完成revenue
  percentMonthRevenue = 0;
  budgetMonth = 0;
  actualMonth = 0;
  // block 4 月度Job In
  jobInDataMonth: any[] = [];
  jobInMTD = 0;
  //  date var
  theMonth = new Date().getMonth();
  theYear = new Date().getFullYear();

  revenueActual: any = [];
  jobInActual: any = [];

  timeChartData: any = [];

  // latestUpdateDate: Date;
  // totalLiveQuantity = 0;
  // totalLiveAmount = 0;
  RevenueTitle = '';

  ProjectNos = 'Project Nos';
  loading = false;
  engineersList = [];
  workload = 0;

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
  maxLiveCount = 0;
  maxLiveAmount = 0;
  maxFYCount = 0;
  maxFYAmount = 0;
  maxLoad = 0;
  jobDataofThisYear: any[] = [];
  @Input() set subTeam(value: string) {
    this.loading = true;
    this.http.get(`biz/EngineersStatus/${value}`).subscribe(
      res => {
        // this.engineersList = res.Items;
        this.engineersShowList = res.Items;
        console.log(this.engineersShowList);
        this.loading = false;

        this.maxLiveCount = this.engineersShowList.reduce(
          (acc, cur) => (cur.LiveCount <acc ? acc : cur.LiveCount),
          0,
        );
        this.maxLiveAmount = this.engineersShowList.reduce(
          (acc, cur) => (cur.LiveAmount < acc ? acc : cur.LiveAmount),
          0,
        );
        this.maxFYCount = this.engineersShowList.reduce(
          (acc, cur) =>
            cur.FinishedCountofThisYear < acc
              ? acc
              : cur.FinishedCountofThisYear,
          0,
        );
        this.maxFYAmount = this.engineersShowList.reduce(
          (acc, cur) =>
            cur.FinishedAmountofThisYear < acc
              ? acc
              : cur.FinishedAmountofThisYear,
          0,
        );
        this.maxLoad = this.engineersShowList.reduce(
          (acc, cur) =>
            cur.TotalLoadWorkingDay < acc ? acc : cur.TotalLoadWorkingDay,
          0,
        );

        this.maxLoad *= 2;
        this.maxLiveCount *= 2;
        this.maxLiveAmount *= 2;
        this.maxFYCount *= 2;
        this.maxFYAmount *= 2;
        console.log(
          this.maxLiveCount,
          this.maxLiveAmount,
          this.maxFYCount,
          this.maxFYAmount,
          this.maxLoad,
        );
      },
      err => (this.loading = false),
      () => {},
    );
  }
  ngOnInit() {
    this.loading = true;

    zip(
      this.http.get(`biz/revenue/${this.theYear}`),
      this.http.get('biz/jobtrends/team', {
        from: new Date(this.theYear, this.theMonth, 1).toLocaleDateString(),
        to: new Date().toLocaleDateString(),
      }),
    ).subscribe(
      ([rjJsonData, jonIn]) => {
        // block 1 & 3
        this.revenueActual = [];
        this.RevenueTitle = 'Revenue (' + rjJsonData.unit + ')';
        this.budgetMonth = rjJsonData.data[this.theMonth].Budget;
        this.budgetTotal = [...rjJsonData.data].reduce(
          (acc, cur) => acc + cur.Budget,
          0,
        );
        this.actualTotoal = [...rjJsonData.data].reduce(
          (acc, cur) => acc + cur.Actual,
          0,
        );
        this.percentYearRevenue = Math.floor(
          (this.actualTotoal * 100) / this.budgetTotal,
        );

        // block 2
        const temp3: any[] = [];
        [...rjJsonData.data].forEach(item => {
          temp3.push({
            x: item.Month,
            y: item.JobInActual,
          });
          this.revenueActual.push({
            x: item.Month,
            y: item.Actual,
          });
          this.jobInActual.push({
            x: item.Month,
            y: item.JobInActual,
          });
        });
        this.jobInDataYear = temp3;
        const temp0 = this.jobInDataYear.reduce((acc, cur) => acc + cur.y, 0);
        this.jobInYTD = temp0;
        console.log(this.jobInDataYear);
        console.log(this.jobInYTD);
        // block 3
        // this.jobInDataMonth = this.getFinshedStatusofThisMonth(jonIn);
        console.log(jonIn);
        this.actualMonth = jonIn.Items.reduce(
          (acc, cur) => acc + cur.JobCompleteAmount,
          0,
        );
        this.percentMonthRevenue = Math.floor(
          (this.actualMonth * 100) / rjJsonData.data[this.theMonth].Budget,
        );
        // block 4
        const temp1: any[] = [];
        const temp2: any[] = [];
        jonIn.Items.forEach(element => {
          temp1.push({
            x: format(Date.parse(element.TheDay), 'YYYY-MM-DD'),
            y: element.JobOpenAmount,
          });
        });
        const beginDay = new Date(this.theYear, this.theMonth, 1).getTime();
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
        this.jobInDataMonth = temp2;
        const tempMTD = this.jobInDataMonth.reduce(
          (acc, cur) => acc + cur.y,
          0,
        );
        this.jobInMTD = tempMTD;
        this.jobInYTD = this.jobInYTD + this.jobInMTD;
        console.log(this.jobInMTD);

        // for chart of revenue
        [...rjJsonData.data].forEach(element => {
          // for timline chart
          if (this.timeChartData.length !== 24) {
            if (element.Actual !== 0) {
              this.timeChartData.push({
                month: element.Month,
                valueType: 'actual',
                value: element.Actual,
              });
            }

            this.timeChartData.push({
              month: element.Month,
              valueType: 'budget',
              value: element.Budget,
            });
          }
        });

        
        this.loading = false;
      },
      err => (this.loading = false),
      () => {
        this.subTeam='total';
        this.renderChart(this.timeChartData);
      },
    );
  }

  renderChart(chartData: any[]) {
    const chart = new G2.Chart({
      container: 'lineChart',
      forceFit: true,
      height: 290,
      animate: false,
    });
    chart.source(chartData, {
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
  }
  engIdx = 0;

  engineersShowList: any[] = [];
  getFinshedStatusofThisMonth(data: any[]) {
    const firstDayofThisMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    //   console.log(new Date().getTime());
    //   console.log(firstDayofThisMonth.getTime());
    //   console.log(new Date().getTime()-firstDayofThisMonth.getTime());
    const d = new Date().getTime() - firstDayofThisMonth.getTime();
    const dayCount = Math.abs(Math.floor(d / 1000 / 60 / 60 / 24));
    console.log(dayCount);
    return data.slice(-dayCount);
  }
  sortChange(sort: { key: string; value: string }) {
    if (sort.key && sort.value) {
      this.engineersShowList = this.engineersShowList.sort((a, b) =>
        sort.value === 'ascend'
          ? a[sort.key!] > b[sort.key!]
            ? 1
            : -1
          : b[sort.key!] > a[sort.key!]
          ? 1
          : -1,
      );
    } else {
      this.engineersShowList = this.engineersShowList;
    }
  }
}
