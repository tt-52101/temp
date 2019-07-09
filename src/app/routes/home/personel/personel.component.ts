import { ProjectTransfer } from './../../../services/biz/projecttransfer';
import { LayoutProHeaderWidgetComponent } from './../../../layout/pro/components/widget/widget.component';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { format } from 'date-fns';

@Component({
  selector: 'app-routes-home-personel',
  templateUrl: './personel.component.html',
})
export class RoutesHomePersonelComponent implements OnInit {
  theYear = new Date().getFullYear();
  theMonth = new Date().getMonth();
  // block1
  RevenueActualYTM = 0;

  synName = '';
  loading = false;
  pageSize = 20;
  pageIndex = 1;
  ptsShow: ProjectTransfer[] = [];
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  private _status: string;
  @Input() set status(value: string) {
    if (this._status !== value) {
      this._status = value;
      this.getData(value);
    }
  }

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    const userO = JSON.parse(user);
    console.log(userO);
    this.synName = userO.SyneltsName;
    console.log(this.synName);
    this.getPersonelJobData('Devin Qi');
    // this.renderChart(this.timeJobData);
  }
  render(chartData) {
   
    var dv = new DataSet.View().source(this.timeJobData);
    
    dv.transform({
      type: 'fold',
      fields: ['JobOpenAmount', 'JobCompleteAmount'],
      key: 'type',
      value: 'value',
    });
    const chart = new G2.Chart({
      container: chartData.nativeElement,
      forceFit: true,
      height: 280,
    });
    chart.source(dv, {
      value: {
        alias: 'The Share',
        formatter: function formatter(val) {
          return '￥' + val;
        },
      },
      TheDay: {
        range: [0, 1],
      },
    });
    chart.tooltip({
      crosshairs: true,
    });
    chart
      .area()
      .position('TheDay*value')
      .color('type')
      .shape('smooth');
    chart
      .line()
      .position('TheDay*value')
      .color('type')
      .size(2)
      .shape('smooth');
    chart.render();
  }
  getPersonelJobData(synName: string) {
    this.http
      .get(`biz/jobtrends/${synName}`, {
        from: new Date(this.theYear, 0, 1).toLocaleDateString(),
        to: new Date().toLocaleDateString(),
      })
      .subscribe(res => {
        const temp1 = [];
        const temp2 = [];
        res.Items.forEach(element => {
          temp1.push({
            TheDay: format(Date.parse(element.TheDay), 'YYYY-MM-DD'),
            JobOpenAmount: element.JobOpenAmount,
            JobCompleteAmount:element.JobCompleteAmount
          });
        });
        const beginDay = new Date(this.theYear, 0, 1).getTime();
        const endDay = new Date().getTime();
        const dayCount = Math.abs(endDay - beginDay) / 1000 / 60 / 60 / 24;
        for (let i = 0; i < dayCount; i += 1) {
          let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
          let ss = temp1.find(n => n.TheDay === format(theDay, 'YYYY-MM-DD'));
          if (ss) {
            temp2.push({
              TheDay: format(theDay, 'YYYY-MM-DD'),
              y1: ss.JobOpenAmount,
              y2:ss.JobCompleteAmount
            });
          } else {
            temp2.push({
              TheDay: format(theDay, 'YYYY-MM-DD'),
              y1: 0,
              y2:0
            });
          }
        }
        console.log(res.Items);
        this.timeJobData = temp2;
        console.log(temp2);
      });
  }
  // block 1 年度完成revenue
  thisYearJobAmount = 0;
  thisYearJobNos = 10;
  percentYearofNos = 0;
  percentYearofAmount = 0;
  // block 2 月度完成revenue
  thisMonthJobAmount = 10;
  thisMonthJobNos = 10;
  percentMonthofNos = 0;
  percentMonthofAmount = 0;
  // block3
  timeJobData: any[] = [];
  ratio = 0;
  // block 4
  everJobAmount = 0;
  everJobNos = 0;
  percentEverofNos = 0;
  percentEverofAmount = 0;

  openEdit() {}
  search(): void {
    const filterFunc = (item: ProjectTransfer) => {
      return item.ProjectNo.indexOf(this.searchValue) !== -1;
    };
    const data = this.ptsShow.filter((item: ProjectTransfer) =>
      filterFunc(item),
    );
    this.ptsShow = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName] > b[this.sortName]
          ? 1
          : -1
        : b[this.sortName] > a[this.sortName]
        ? 1
        : -1,
    );
  }
  reset() {
    this.searchValue = '';
    this.search();
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  getData(status: string) {
    this.loading = true;
    switch (status) {
      case 'joh':
        {
          this.http
            .get('home/ProjectsByEngName', {
              synetlsName: this.synName,
              isInclude: 'true',
              isFinish: 'false',
            })
            .subscribe((res: any) => {
              this.ptsShow = [...res.Items];
              this.loading = false;
              this.cdr.detectChanges();
            });
        }
        break;
      case 'jfm':
        {
          {
            this.http
              .get('home/ProjectsByFilter', {
                EngineerName: this.synName,
                IsIncludeAll: 'true',
                isFinished: 'true',
                CompleteDateFrom: new Date(
                  this.theYear,
                  this.theMonth,
                  1,
                ).toLocaleDateString(),
                CompleteDateTo: new Date().toLocaleDateString(),
              })
              .subscribe((res: any) => {
                if (res === null) {
                  this.ptsShow = [];
                } else {
                  this.ptsShow = [...res.Items];
                }

                console.log(res);
                this.loading = false;
                this.cdr.detectChanges();
              });
          }
        }
        break;
      case 'jfy':
        {
          {
            this.http
              .get('home/ProjectsByFilter', {
                EngineerName: this.synName,
                IsIncludeAll: 'true',
                isFinished: 'true',
                CompleteDateFrom: new Date(
                  this.theYear,
                  0,
                  1,
                ).toLocaleDateString(),
                CompleteDateTo: new Date().toLocaleDateString(),
              })
              .subscribe((res: any) => {
                if (res === null) {
                  this.ptsShow = [];
                } else {
                  this.ptsShow = [...res.Items];
                }

                console.log(res);
                this.loading = false;
                this.cdr.detectChanges();
              });
          }
        }
        break;
      case 'jfe':
        {
          {
            this.http
              .get('home/ProjectsByFilter', {
                EngineerName: this.synName,
                IsIncludeAll: 'true',
                isFinished: 'true',
                CompleteDateFrom: new Date(2015, 0, 1).toLocaleDateString(),
                CompleteDateTo: new Date().toLocaleDateString(),
              })
              .subscribe((res: any) => {
                if (res === null) {
                  this.ptsShow = [];
                } else {
                  this.ptsShow = [...res.Items];
                }

                console.log(res);
                this.loading = false;
                this.cdr.detectChanges();
              });
          }
        }
        break;
    }
  }
}
