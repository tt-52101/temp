import { filter } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from, of } from 'rxjs';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { forEach } from '@angular/router/src/utils/collection';
import { STColumn } from '@delon/abc';

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
  OpenDateFrom: Date = new Date(2005, 2, 1);
  OpenDateTo: Date = new Date();
  CompleteDateFrom: Date = new Date(2005, 2, 1);
  CompleteDateTo: Date = new Date();
  IsFinished:any;
  totalCount:number;
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

  // 客户，service

  // table
  ptsShow=[];
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  jobProgressType = [
    { index: 0, text: '已完成', value: false, checked: false },
    { index: 1, text: '未完成', value: false, checked: false },
    { index: 2, text: '全部', value: false, checked: false },
  ];

  expandForm = false;
  filterOpen=false;
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
pageInfo={
  pageSizes:[100],
  placement:'center',
  showQuickJumper:true,
  showSize:true
};
  columns:STColumn[]=[
    {
      title: 'Job No',
      index: 'ProjectNo',
      sort:{
        compare:(a: ProjectTransfer, b: ProjectTransfer) => a.ProjectNo > b.ProjectNo?1:-1
      },
    },
    {
      title: 'Quotation No',
      index: 'QuotationNo',
      sort:{
        compare:(a: ProjectTransfer, b: ProjectTransfer) => a.QuotationNo > b.QuotationNo?1:-1
      },
    },
    {
      title:'Open Date',
      index:'OpenDate',
      type:'date',
      dateFormat: 'YYYY-MM-DD',
      sort:{
        compare:(a:ProjectTransfer,b:ProjectTransfer)=>a.OpenDate>b.OpenDate?1:-1
      }
    },
    {
      title: 'Client',
      index: 'ClientName',
      sort:{
        compare:(a: ProjectTransfer, b: ProjectTransfer) => a.ClientName > b.ClientName?1:-1
      },      
    },
    {
      title: 'Service',
      index: 'ServiceNames',
      sort:{
        compare:(a: ProjectTransfer, b: ProjectTransfer) => a.ServiceNames > b.ServiceNames?1:-1
      },    
    },
    {
      title: 'Fee',
      index: 'QuotedFee',
      type:'currency',
      sort:{
        compare:(a:ProjectTransfer,b:ProjectTransfer)=>a.QuotedFee-b.QuotedFee
      }
    },
    {
      title: 'TAT',
      index: 'ActualProjectWorkingDays',
      type:'number',
      sort:{
        compare:(a:ProjectTransfer,b:ProjectTransfer)=>a.ActualProjectWorkingDays-b.ActualProjectWorkingDays
      }
    },
  ];

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
      console.log(this.ptsShow);
    // this.getData('joh');
  }
  filterData() {}
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
    
    if(this.expandForm){
      console.log(this.expandForm);
      this.loading = true;
    this.checkloading=true;
      this.params.OpenDateFrom = this.OpenDateFrom.toString()!=='Invalid Date'?this.OpenDateFrom.toLocaleDateString():'';
      this.params.OpenDateTo =this.OpenDateTo.toString()!=='Invalid Date'? this.OpenDateTo.toLocaleDateString():'';
      this.params.CompleteDateFrom =this.CompleteDateFrom.toString()!=='Invalid Date'? this.CompleteDateFrom.toLocaleDateString():'';
      this.params.CompleteDateTo = this.CompleteDateTo.toString()!=='Invalid Date'?this.CompleteDateTo.toLocaleDateString():'';
      switch(this.IsFinished){
        case 0:
        this.params.IsFinished=true;
        break;
        case 1:
        this.params.IsFinished=false;
        break;
        case 2:
        this.params.IsFinished='';
      }
      console.log(this.params);
      this.http.get<ProjectTransfer[]>('home/ProjectsbyFilter', this.params,
    {observe:'response',responseType:'json'})
    .subscribe(res => {
      
      this.ptsShow=[...res.body];
      this.totalCount=this.ptsShow.length;
    },err=>{
      this.msgSrv.error('获取数据失败！');
      this.loading=false;
      this.checkloading=false;
    },
    ()=>{
      this.msgSrv.success('获取数据成功');
      this.loading=false;
      this.checkloading=false;
    }
    );
    }else{
      if(this.inputJobno.length<9){
        this.msgSrv.warning('输入job no 不符合规则！');
        return;
      }
      console.log(this.inputJobno);
      this.http.get(`home/ProjectByProjectNo/${this.inputJobno}`)
      .subscribe(
        res=>{
          console.log(res);
          this.ptsShow=[res];
        },
        err=>this.msgSrv.error('数据获取失败！'),
        ()=>this.msgSrv.success('数据获取成功！')
      )
    }
    
    
  }
}
