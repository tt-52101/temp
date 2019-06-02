import { filter } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NzModalRef, NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { _HttpClient, DrawerHelper } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from, of } from 'rxjs';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { STColumn, STChange } from '@delon/abc';
import { SFButton, SFSchema } from '@delon/form';
import { SettingImportEditProjectComponent } from '../edit/project/project.component';
import { SettingImportEditRecordsComponent } from '../edit/records/records.component';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
  expandForm = false;
  inputJobno = '';
  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}
  // forms
  engineers = [];
  engineeringCSs = [];
  sales = [];
  Services = [
    { label: 'CE-LVD', value: 'CE-LVD' },
    { label: 'GS', value: 'GS' },
    { label: 'ETL', value: 'ETL' },
  ];
  progressTypes = [
    { label: '未完成', value: 'Unfinished' },
    { label: '已完成', value: 'Finished' },
    { label: '全部', value: 'All' },
  ];
  BusinessType = [
    { label: '安规', value: 'Safety' },
    { label: '能效', value: 'Energy Efficiency' },
    { label: '化学', value: 'Chemical' },
  ];
  RegionType = [
    { label: 'IEC体系', value: 'IEC' },
    { label: 'US体系', value: 'US' },
    { label: 'GMAP体系', value: 'GMAP' },
  ];
  ClientType = [
    { label: '普通客户', value: 'Normal' },
    { label: 'VIP客户', value: 'VIP' },
    { label: 'Agent客户', value: 'Agent' },
  ];
  qSchema: SFSchema = {
    properties: {
      EngineerName: {
        type: 'string',
        title: '工程师',
        enum: this.engineers,
        ui: { widget: 'select' },
      },
      EngineeringCSName: {
        type: 'string',
        title: '工程助理',
        enum: this.engineeringCSs,
        ui: { widget: 'select' },
      },
      SalesName: {
        type: 'string',
        title: '销售',
        enum: this.sales,
        ui: { widget: 'select' },
      },
      ClientName: { type: 'string', title: '客户名称' },
      ServiceName: {
        type: 'string',
        title: '服务名称',
        ui: { widget: 'autocomplete' },
      },
      QuotationNo: { type: 'string', title: '报价单号' },
      OpenDate: { type: 'string', ui: { widget: 'date', mode: 'range' } },
      CompleteDate: { type: 'string', ui: { widget: 'date', mode: 'range' } },
      Progress: {
        type: 'string',
        title: '完成度',
        enum: this.progressTypes,
        default: 'All',
        ui: { widget: 'select' },
      },
      BType: {
        type: 'string',
        title: '业务类型',
        enum: this.BusinessType,
        default: 'All',
        ui: { widget: 'select' },
      },
      RType: {
        type: 'string',
        title: '区域类型',
        enum: this.RegionType,
        default: 'All',
        ui: { widget: 'select' },
      },
      CType: {
        type: 'string',
        title: '客户类型',
        enum: this.ClientType,
        default: 'All',
        ui: { widget: 'select' },
      },
    },
    enum: this.Services,
    ui: {
      grid: { md: 12, lg: 8, sm: 6, xs: 4 },
      spanLabelFixed: 120,
    },
  };
  btn: SFButton = {
    render: { grid: { span: 24 }, class: 'text-right mb0', spanLabelFixed: 0 },
    submit: 'Search',
  };
  // table
  pageInfo = {
    pageSizes: [100],
    placement: 'center',
    showQuickJumper: true,
    showSize: true,
  };
  ptColumns: STColumn[] = [
    {
      title: 'Job No',
      index: 'ProjectNo',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.ProjectNo > b.ProjectNo ? 1 : -1,
      },
    },
    {
      title: 'Quotation No',
      index: 'QuotationNo',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.QuotationNo > b.QuotationNo ? 1 : -1,
      },
    },
    {
      title: 'Open Date',
      index: 'OpenDate',
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.OpenDate > b.OpenDate ? 1 : -1,
      },
    },
    {
      title: 'Client',
      index: 'ClientName',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.ClientName > b.ClientName ? 1 : -1,
      },
    },
    {
      title: 'Service',
      index: 'ServiceNames',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.ServiceNames > b.ServiceNames ? 1 : -1,
      },
    },
    {
      title: 'Fee',
      index: 'QuotedFee',
      type: 'currency',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.QuotedFee - b.QuotedFee,
      },
    },
    {
      title: '',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingImportEditProjectComponent,
            size: 'lg',
            paramsName: 'i',
          },
          click: 'reload',
        },
        {
          icon: 'ordered-list',
          type: 'static',
          
          modal: {
            component: SettingImportEditRecordsComponent,
            size: 'lg',
            paramsName: 'i',
          },
          click: 'reload',
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            this.http.delete(`home/project/${i.Id}`).subscribe(
              res => {
                this.msg.success(res);
              },
              err => {},
              () => {
                this.msg.success('Success');
                c.removeRow(i);
              },
            );
          },
        },
      ],
    },
  ];
  pts: ProjectTransfer[] = [];
  loading = false;
  ngOnInit(): void {
    // this.http.get(`home/dbstatus`).subscribe(res => (this.record = res));
    // this.http.get('person/userAll').subscribe(
    //   (res: SyneltsUser[]) => {
    //     [...res].forEach(item => {
    //       this.users.push(item);
    //       console.log(item);
    //     });
    //     console.log(this.users);
    //   },
    //   err => {},
    //   () => {
    //     [...this.users].forEach(item => {
    //       let i = 0;
    //       if (item.SyneltsRole.indexOf('0') !== -1) {
    //         this.engineer.push({
    //           index: i,
    //           text: item.Name,
    //           value: false,
    //           checked: false,
    //         });
    //         i++;
    //       }
    //       let j = 0;
    //       if (item.SyneltsRole.indexOf('1') !== -1) {
    //         this.EngCS.push({
    //           index: j,
    //           text: item.Name,
    //           value: false,
    //           checked: false,
    //         });
    //         j++;
    //       }
    //       let k = 0;
    //       if (item.SyneltsRole.indexOf('2') !== -1) {
    //         this.sales.push({
    //           index: k,
    //           text: item.Name,
    //           value: false,
    //           checked: false,
    //         });
    //         k++;
    //       }
    //     });
    //     console.log(this.engineer);
    //   },
    // );
    // this.getData('joh');
  }
  simpleGetData() {
    this.http.get(`home/ProjectSearchByProjectNo`,{projectNo:this.inputJobno.trim()}).subscribe(
      res=>{
        if(res.Message==="OK"){
          this.pts=res.Items;
        }else{
          this.msg.error(res.Message);
        }
      }
    );
  }
  load(param: any = null) {
    console.log(param);
  }
  stChange(e: STChange) {}
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
    // if (this.expandForm) {
    //   console.log(this.expandForm);
    //   this.loading = true;
    //   this.checkloading = true;
    //   this.params.OpenDateFrom =
    //     this.OpenDateFrom.toString() !== 'Invalid Date'
    //       ? this.OpenDateFrom.toLocaleDateString()
    //       : '';
    //   this.params.OpenDateTo =
    //     this.OpenDateTo.toString() !== 'Invalid Date'
    //       ? this.OpenDateTo.toLocaleDateString()
    //       : '';
    //   this.params.CompleteDateFrom =
    //     this.CompleteDateFrom.toString() !== 'Invalid Date'
    //       ? this.CompleteDateFrom.toLocaleDateString()
    //       : '';
    //   this.params.CompleteDateTo =
    //     this.CompleteDateTo.toString() !== 'Invalid Date'
    //       ? this.CompleteDateTo.toLocaleDateString()
    //       : '';
    //   switch (this.IsFinished) {
    //     case 0:
    //       this.params.IsFinished = true;
    //       break;
    //     case 1:
    //       this.params.IsFinished = false;
    //       break;
    //     case 2:
    //       this.params.IsFinished = '';
    //   }
    //   console.log(this.params);
    //   this.http
    //     .get<ProjectTransfer[]>('home/ProjectsbyFilter', this.params, {
    //       observe: 'response',
    //       responseType: 'json',
    //     })
    //     .subscribe(
    //       res => {
    //         this.ptsShow = [...res.body];
    //         this.totalCount = this.ptsShow.length;
    //       },
    //       err => {
    //         this.msgSrv.error('获取数据失败！');
    //         this.loading = false;
    //         this.checkloading = false;
    //       },
    //       () => {
    //         this.msgSrv.success('获取数据成功');
    //         this.loading = false;
    //         this.checkloading = false;
    //       },
    //     );
    // } else {
    //   if (this.inputJobno.length < 9) {
    //     this.msgSrv.warning('输入job no 不符合规则！');
    //     return;
    //   }
    //   console.log(this.inputJobno);
    //   this.http.get(`home/ProjectByProjectNo/${this.inputJobno}`).subscribe(
    //     res => {
    //       console.log(res);
    //       this.ptsShow = [res];
    //     },
    //     err => this.msgSrv.error('数据获取失败！'),
    //     () => this.msgSrv.success('数据获取成功！'),
    //   );
    // }
  }
  reset() {}
}
