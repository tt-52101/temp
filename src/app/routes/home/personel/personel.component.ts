import { ProjectTransfer } from './../../../services/biz/projecttransfer';
import { LayoutProHeaderWidgetComponent } from './../../../layout/pro/components/widget/widget.component';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'app-routes-home-personel',
  templateUrl: './personel.component.html',
})
export class RoutesHomePersonelComponent implements OnInit {
  theYear=new Date().getFullYear();
  theMonth=new Date().getMonth();
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
  }
   // block 1 年度完成revenue
   percentYearRevenue = 0;
   budgetTotal = 0;
   actualTotoal = 0;
  // block 2 月度完成revenue
  percentMonthRevenue = 0;
  budgetMonth = 0;
  actualMonth = 0;
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
                CompleteDateFrom:new Date(this.theYear,this.theMonth,1).toLocaleDateString(),
                CompleteDateTo:new Date().toLocaleDateString(),
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
                CompleteDateFrom:new Date(this.theYear,0,1).toLocaleDateString(),
                CompleteDateTo:new Date().toLocaleDateString(),
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
                CompleteDateFrom:new Date(2015,0,1).toLocaleDateString(),
                CompleteDateTo:new Date().toLocaleDateString(),
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
