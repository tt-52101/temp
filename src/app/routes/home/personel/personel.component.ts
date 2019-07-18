import { ActivatedRoute } from '@angular/router';
import { HomePersonelCategorizeComponent } from './categorize/categorize.component';
import { ProjectTransfer } from './../../../services/biz/projecttransfer';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper, DrawerHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { zip } from 'rxjs';

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
    private drawer:DrawerHelper,
    private routeInfo: ActivatedRoute
  ) {}

  ngOnInit() {
    const engineerName=this.routeInfo.snapshot.params['engineerName'];
    if(engineerName==='self'){
      const user = localStorage.getItem('user');
      const userO = JSON.parse(user);
      console.log(userO);
      this.synName = userO.SyneltsName;
    }else{
      this.synName=engineerName;
      
    }
    
    console.log(this.synName);
    this.getPersonelJobData(this.synName);
    this.status='joh';
  }

  getPersonelJobData(synName: string) {
    zip(
      this.http
      .get(`biz/jobtrends/${synName}`, {
        from: new Date(2015, 0, 1).toLocaleDateString(),
        to: new Date().toLocaleDateString(),
      }),
      this.http
      .get('biz/engineerstatus', { name: this.synName })
    ).subscribe(
      ([jobTrends,engineerStatus])=>{
        const temp1 = [];
        const temp2 = [];
        jobTrends.Items.forEach(element => {
          temp1.push({
            TheDay: Date.parse(element.TheDay),
            JobOpenAmount: element.JobOpenAmount,
            JobCompleteAmount: element.JobCompleteAmount,
          });
        });
        const beginDay = new Date(this.theYear, 0, 1).getTime();
        const endDay = new Date().getTime();
        const dayCount = Math.abs(endDay - beginDay) / 1000 / 60 / 60 / 24;
        for (let i = 0; i < dayCount; i += 1) {
          let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
          let ss = temp1.find(n => n.TheDay === theDay.getTime());
          if (ss) {
            temp2.push({
              x: ss.TheDay,
              y1: ss.JobOpenAmount,
              y2: ss.JobCompleteAmount,
            });
          } else {
            temp2.push({
              x: theDay.getTime(),
              y1: 0,
              y2: 0,
            });
          }
        }
        console.log(jobTrends.Items);

        this.timeJobData = temp2;
        this.thisYearJobNos = engineerStatus.Items[0].FinishedCountofThisYear;
        this.thisYearJobAmount = engineerStatus.Items[0].FinishedAmountofThisYear;
        this.thisMonthJobNos = engineerStatus.Items[0].FinishedCountofThisMonth;
        this.thisMonthJobAmount = engineerStatus.Items[0].FinishedAmountofThisMonth;
        this.everJobNos = engineerStatus.Items[0].FinishedCount;
        this.everJobAmount = engineerStatus.Items[0].FinishedAmount;
        console.log(engineerStatus.Items);
      }
      
      
    );

    
  }
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
    return data.slice(-dayCount);
  }
  getFinshedStatusofThisYear(data: any[]) {
    const firstDayofThisYear = new Date(new Date().getFullYear(), 0, 1);
    //   console.log(new Date().getTime());
    //   console.log(firstDayofThisMonth.getTime());
    //   console.log(new Date().getTime()-firstDayofThisMonth.getTime());
    const d = new Date().getTime() - firstDayofThisYear.getTime();
    const dayCount = Math.abs(Math.floor(d / 1000 / 60 / 60 / 24));
    return data.slice(-dayCount);
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
  openCaculation(i:any){
    this.drawer.static('分类计算结果',HomePersonelCategorizeComponent,{i},{}).subscribe(
      res=>console.log(res)
    );
  }
}
