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
  loading = false;
  pageSize = 20;
  pageIndex = 1;
  params: any = { synetlsName: 'Ryan Rui', isInclude: 'true' };
  ptsShow: ProjectTransfer[];
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
    this.getData('joh');
  }

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
              synetlsName: 'Ryan Rui',
              isInclude: 'true',
              isFinish: 'false',
            })
            .subscribe((res: any) => {
              this.ptsShow = [...res];
              console.log(this.ptsShow.length);
              this.loading = false;
              this.cdr.detectChanges();
            });
        }
        break;
      case 'jfm':
        {
          {
            this.http
              .get('home/ProjectsByEngName', {
                synetlsName: 'Ryan Rui',
                isInclude: 'true',
                isFinish: 'true',
              })
              .subscribe((res: any) => {
                if (res === null) {
                  this.ptsShow = [];
                } else {
                  this.ptsShow = [...res];
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
          console.log('jfy');
        }
        break;
      case 'jfe':
        {
          console.log('jfe');
        }
        break;
    }
  }
}
