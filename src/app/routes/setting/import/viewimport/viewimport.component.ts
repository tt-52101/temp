import { filter } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from, of } from 'rxjs';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
  loading = false;
  checkloading = false;
  record: any = {};
  users: any = [];
  // 第一行
  inputJobno = '';
  // 第二行
  selectCategory = '';
  category = [];
  selectClientType = '';
  clientType = [];
  selectRegionType = '';
  regionType = [];
  // 第三行
  engineer = [];
  selectEngineer = {};
  sales = [];
  selectSales = {};
  EngCS = [];
  selectEngCS = {};
  // 第四行
  // 日期
  // 第五行
  clients = [];
  selectClient = '';
  services = [];
  selectService = {};
  // http params total directly
  params: any = {
    CurrentPage: 1,
    PageSize: 20,
    IsDeleted: false,
    IsIncludeAll: true,
    IsFinished: '',
    EngineerName: '',
    EngineeringCSName:'',
    AssistEngineerName: '',
    SalesCSName: '',
    SalesName:'',
    ServiceName: '',
    ClientName: '',
    OpenDateFrom: '',
    OpenDateTo: '',
    CompleteDateFrom: '',
    CompleteDateTo: '',
  };
  
  // 客户，service

  // table
  ptsShow = [];
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  status = [
    { index: 0, text: '安规', value: false, checked: false },
    { index: 1, text: '能效', value: false, checked: false },
    { index: 2, text: '化学', value: false, checked: false },
  ];

  
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
    this.http.get('person/userAll').subscribe(
      (res: SyneltsUser[]) => {
        [...res].forEach(item => {
          this.users.push(item);
          console.log(item);
        });
        console.log(this.users);
      },
      err => {},
      () => {
        [...this.users].forEach(item => {
          let i = 0;
          if (item.SyneltsRole.indexOf('0') !== -1) {
            this.engineer.push({
              index: i,
              text: item.Name,
              value: false,
              checked: false,
            });
            i++;
          }
          let j = 0;
          if (item.SyneltsRole.indexOf('1') !== -1) {
            this.EngCS.push({
              index: j,
              text: item.Name,
              value: false,
              checked: false,
            });
            j++;
          }
          let k = 0;
          if (item.SyneltsRole.indexOf('2') !== -1) {
            this.sales.push({
              index: k,
              text: item.Name,
              value: false,
              checked: false,
            });
            k++;
          }
        });
        console.log(this.engineer);
      },
    );

    // this.getData('joh');
  }
  // search(): void {
  //   const filterFunc = (item: ProjectTransfer) => {
  //     return item.ProjectNo.indexOf(this.searchValue) !== -1;
  //   };
  //   const data = this.ptsShow.filter((item: ProjectTransfer) =>
  //     filterFunc(item),
  //   );
  //   this.ptsShow = data.sort((a, b) =>
  //     this.sortValue === 'ascend'
  //       ? a[this.sortName] > b[this.sortName]
  //         ? 1
  //         : -1
  //       : b[this.sortName] > a[this.sortName]
  //       ? 1
  //       : -1,
  //   );
  // }
  // reset() {
  //   this.searchValue = '';
  //   this.search();
  // }
  // sort(sort: { key: string; value: string }): void {
  //   this.sortName = sort.key;
  //   this.sortValue = sort.value;
  //   this.search();
  // }

  getData() {
    console.log(new Date(2019,1,1));
    console.log(new Date(2019,1,1).toString());
    console.log(new Date(2019,1,1).toLocaleString());
    console.log(new Date(2019,1,1).toDateString());
    console.log(new Date(2019,1,1).toLocaleDateString());
    this.loading = true;
    console.log(this.params);
    this.http.get('home/ProjectsFilterByPage',this.params)
    .subscribe(res=>{
      console.log(JSON.stringify(res));
    });
  }
}
