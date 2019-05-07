import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
  loading = false;
  checkloading=false;
  pageSize = 20;
  pageIndex = 1;
  record: any = {};
  params: any = { 
    CurrentPage:1,
    PageSize:20,
    IsDeleted:false,
    IsIncludeAll:true,
    IsFinished:false,
    EngineerName:'Ryan Rui',
    EngineeringCSName:'',
    AssitEngineerName:'',
    SalesCSName:'',
    SalesName:'',
    ServiceName:'',
    ClientName:'',
    OpenDateFrom:new Date(2015,1,1),
    OpenDateTo:Date.now,
    CompleteDateFrom:new Date(2019,1,1),
    CompleteDateTo:Date.now
   };
  ptsShow = [];
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  status = [
    { index: 0, text: '安规', value: false, checked: false },
    { index: 1, text: '能效', value: false, checked: false},
    { index: 2, text: '化学', value: false, checked: false },
  ];
  engineer=[
    { index: 0, text: 'Patrick Chen', value: false, checked: false },
    { index: 1, text: 'Jerry Chen', value: false, checked: false},
    { index: 2, text: 'Meng Wang', value: false, checked: false },
  ];
  sales=[

  ];
  EngCS=[

  ];
  clients=[];
  services=[];
  expandForm = false;
  // @Input() set status(value: string) {
  //   if (this._status !== value) {
  //     this._status = value;
  //     switch(value){
  //       case 'joh':
  //       this.params.OpenDateFrom='';
  //       break;

  //     }
  //     this.getData(value);
  //   }
  // }
  // get status(){
  //   return this._status;
  // }
  constructor(
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.http.get(`home/dbstatus`).subscribe(res => (this.record = res));
    this.getData('joh');
  }
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
