import { Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { debounceTime } from 'rxjs/operators';
import { ProjectTransfer } from './../../../../services/biz/projecttransfer';
import { CacheService } from '@delon/cache';
import {
  SFComponent,
  SFButton,
  SFSchema,
  SFSchemaEnum,
  SFSchemaEnumType,
} from '@delon/form';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { _HttpClient, DrawerHelper } from '@delon/theme';
import {
  STComponent,
  STColumn,
  STChange,
  STData,
  STColumnTag,
  STWidthMode,
  XlsxService,
} from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingImportEditRecordsComponent } from '../../import/edit/records/records.component';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { of } from 'rxjs';
import { __getInputValues } from '@angularclass/hmr';
import { RoutesComponentsProjectDrawerViewComponent } from 'app/routes/components/project-drawer-view/project-drawer-view.component';

@Component({
  selector: 'app-setting-teamset-routing',
  templateUrl: './routing.component.html',
})
export class SettingTeamsetRoutingComponent implements OnInit {
  expandForm = false;
  settingChoose = '只显示未设置项目';
  inputJobno = '';
  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: SFComponent;

  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    private drawer: DrawerHelper,
    public cache: CacheService,
    private cdr: ChangeDetectorRef,
    private xlsx:XlsxService
  ) {}
  // forms
  users = [];
  engineers = [];
  engineeringCSs = [];
  selectRows: STData[] = [];
  sales = [];
  Services = [];
  IsFinished = [
    { label: '未完成', value: false },
    { label: '已完成', value: true },
  ];
  BusinessType = [
    { label: '安规', value: 'Safety' },
    { label: '能效', value: 'EE' },
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
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      EngineeringCSName: {
        type: 'string',
        title: '工程助理',
        enum: this.engineeringCSs,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      SalesName: {
        type: 'string',
        title: '销售',
        enum: this.sales,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      ClientName: {
        type: 'string',
        title: '客户名称',
        ui: {
          placeholder: '输入客户名称',
        },
      },
      ServiceName: {
        type: 'string',
        title: '服务名称',
        ui: {
          widget: 'autocomplete',
          debounceTime: 100,
          placeholder: '输入Service名称',
          backfill: true,
          asyncData: (input: string) =>
            of(
              input
                ? this.Services.filter(
                    c => c.toLowerCase().indexOf(input.toLowerCase()) > -1,
                  )
                : [],
            ),
        },
      },
      QuotationNo: {
        type: 'string',
        title: '报价单号',
        ui: { placeholder: '请输入报价单号' },
      },
      OpenDateFromTo: {
        type: 'string',
        title: '开案时间',
        format:'date',
        ui: { widget: 'date', mode: 'range',allowClear:true },
      },
      CompleteDateFromTo: {
        type: 'string',
        title: '结案时间',
        format:'date',
        ui: { widget: 'date', mode: 'range',allowClear:true },
      },
      IsFinished: {
        type: 'boolean',
        title: '完成度',
        enum: this.IsFinished,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      BType: {
        type: 'string',
        title: '业务类型',
        enum: this.BusinessType,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      RType: {
        type: 'string',
        title: '区域类型',
        enum: this.RegionType,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      CType: {
        type: 'string',
        title: '客户类型',
        enum: this.ClientType,
        ui: { widget: 'select', placeholder: '请选择', allowClear: true },
      },
      FromMonth: {
        type: 'string',
        title: '起始月份',
        format: 'month',
        ui: {
          span: 4,
          optionalHelp:'搜索产出月份，会使其他选项失效',
        },
      },
      ToMonth: {
        type: 'string',
        title: '截止月份',
        format: 'month',
        ui: {
          span: 4,
          optionalHelp:'搜索产出月份，会使其他选项失效',
        },
      },
    },
    enum: this.Services,
    ui: {
      grid: { md: 12, lg: 8, sm: 6, xs: 4 },
      spanLabelFixed: 120,
    },
  };
  widthMode: STWidthMode = {
    type: 'strict',
    strictBehavior: 'wrap',
  };
  btn: SFButton = {
    render: { grid: { span: 24 }, class: 'text-right mb0', spanLabelFixed: 0 },
    submit: 'Search',
  };
  // table 前checkbox
  customColumns = [
    { label: 'Quotation No', value: 'QuotationNo', checked: false },
    { label: 'Open Date', value: 'OpenDate', checked: false },
    { label: 'Complete Date', value: 'CompleteDate', checked: false },
    { label: 'Client', value: 'ClientName', checked: true },
    { label: 'Product', value: 'Product', checked: false },
    { label: 'Models', value: 'Models', checked: false },
    { label: 'Service', value: 'ServiceNames', checked: true },
    { label: 'Quoted Fee', value: 'QuotedFee', checked: true },
    { label: 'Invoiced Fee', value: 'InvoicedFee', checked: false },
    {label:'Workload factor',value:'ActualWorkloadFactor',checked:false},
    {label:'Can be fininshed in this month',value:'TobeFinishFlag',checked:false},
    { label: 'Business Type', value: 'BType', checked: true },
    { label: 'Client Type', value: 'CType', checked: true },
    { label: 'Region Type', value: 'RType', checked: true },
    
    
  ];
  // table
  pageInfo = {
    pageSizes: [100],
    placement: 'center',
    showQuickJumper: true,
    showSize: true,
  };
  tags: STColumnTag = {
    Safety: { text: '安规', color: 'orange' },
    Chemical: { text: '化学', color: 'blue' },
    EE: { text: '能效', color: 'green' },
    IEC: { text: '欧系', color: 'blue' },
    US: { text: '美系', color: 'purple' },
    GMAP: { text: '多国', color: 'orange' },
    VIP: { text: 'VIP', color: 'gold' },
    Normal: { text: '普通', color: 'lime' },
    Agent: { text: '代理', color: 'volcano' },
    Unknown: { text: '未知', color: 'red' },
    '': { text: '未知', color: 'red' },
    ' ': { text: '未知', color: 'red' },
    true:{text:'yes',color:'green'},
    false:{text:'no',color:'black'},
  };
  ptColumns: STColumn[] = [
    {
      title: '序号',
      index: 'Id',
      type: 'checkbox',
      width: '50px',
    },
    {
      title: 'Job No',
      index: 'ProjectNo',
      width: '120px',
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
      iif: () => this.isChoose('QuotationNo')
    },
    {
      title: 'Open Date',
      index: 'OpenDate',
      type:'date',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.OpenDate > b.OpenDate ? 1 : -1,
      },
      iif: () => this.isChoose('OpenDate')
    },
    {
      title: 'Complete Date',
      index: 'CompleteDate',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.CompleteDate > b.CompleteDate ? 1 : -1,
      },
      iif: () => this.isChoose('CompleteDate')
    },
    {
      title: 'Client',
      index: 'ClientName',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.ClientName > b.ClientName ? 1 : -1,
      },
      iif: () => this.isChoose('ClientName')
    },
    {
      title: 'Product',
      index: 'Product',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.Product > b.Product ? 1 : -1,
      },
      iif: () => this.isChoose('Product')
    },
    {
      title: 'Models',
      index: 'Models',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.Models > b.Models ? 1 : -1,
      },
      iif: () => this.isChoose('Models')
    },
    {
      title: 'Service',
      index: 'ServiceNames',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.ServiceNames > b.ServiceNames ? 1 : -1,
      },
      iif: () => this.isChoose('ServiceNames')
    },
    {
      title: 'Fee',
      index: 'QuotedFee',
      type: 'currency',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.QuotedFee - b.QuotedFee,
      },
      iif: () => this.isChoose('QuotedFee')
    },
    {
      title: 'Invoiced Fee',
      index: 'InvoicedFee',
      type: 'currency',
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.InvoicedFee - b.InvoicedFee,
      },
      iif: () => this.isChoose('InvoicedFee')
    },
    {
      title: 'Workload Factor',
      index: 'ActualWorkloadFactor',
      type: 'number',
     
      iif: () => this.isChoose('ActualWorkloadFactor')
    },
    {
      title: 'can finished?',
      index: 'TobeFinishFlag',
      type:'tag',
      tag: this.tags,
      iif: () => this.isChoose('TobeFinishFlag')
    },
    {
      title: 'Business Type',
      index: 'BType',
      type: 'tag',
      tag: this.tags,
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.BType > b.BType ? 1 : -1,
      },
      iif: () => this.isChoose('BType')
    },
    {
      title: 'Client Type',
      index: 'CType',
      type: 'tag',
      tag: this.tags,
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.CType > b.CType ? 1 : -1,
      },
      iif: () => this.isChoose('CType')
    },
    {
      title: 'Region Type',
      index: 'RType',
      type: 'tag',
      tag: this.tags,
      sort: {
        compare: (a: ProjectTransfer, b: ProjectTransfer) =>
          a.RType > b.RType ? 1 : -1,
      },
      iif: () => this.isChoose('RType')
    },
    {
      title: 'Operation',
      fixed: 'right',
      width: '120px',
      buttons: [
        {
          icon: 'edit',
          type: 'drawer',
          drawer: {
            component: RoutesComponentsProjectDrawerViewComponent,
            paramsName: 'i',
            size: 'md',
          },
          click: (i, m, c) => {
            if (this.expandForm) {
              this.AdvancedGetData();
            } else {
              this.simpleGetData();
            }
          },
        },
        {
          icon: 'ordered-list',
          type: 'modal',
          modal: {
            component: SettingImportEditRecordsComponent,
            paramsName: 'i',
            size: 'md',
          },
          click: 'reload',
        },
        {
          icon: 'delete',
          type: 'del',
          acl: ['God', 'Super Admin'],
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
  isChoose(key: string): boolean {
    return !!this.customColumns.find(w => w.value === key && w.checked);
  }
  pts: ProjectTransfer[] = [];
  loading = false;
  documents: any[] = [];
  ngOnInit(): void {
    this.http
      .get('assets/tmp/documents.json')
      .subscribe(res => (this.documents = res));
    // this.http.get(`home/dbstatus`).subscribe(res => (this.record = res));
    this.http.get('service/collectionbyfilter', { Name: '' }).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.Services.push(element.Name);
      });
      console.log(this.Services);
    });

    if (!this.cache.getNone('sales')) {
      this.http.get('person/userAll').subscribe(
        (res: SyneltsUser[]) => {
          [...res].forEach(item => {
            this.users.push(item);
          });
          console.log(this.users);
        },
        err => {},
        () => {
          [...this.users].forEach(item => {
            let i = 0;
            if (item.SyneltsRole.indexOf('0') !== -1) {
              this.engineers.push({
                index: i,
                label: item.Name,
                value: item.Name,
              });
              i++;
            }
            let j = 0;
            if (item.SyneltsRole.indexOf('1') !== -1) {
              this.engineeringCSs.push({
                index: j,
                label: item.Name,
                value: item.Name,
              });
              j++;
            }
            let k = 0;
            if (item.SyneltsRole.indexOf('2') !== -1) {
              this.sales.push({
                index: k,
                label: item.Name,
                value: item.Name,
              });
              k++;
            }
          });
          this.cache.set('engineers', this.engineers, {
            type: 's',
            expire: 300,
          });
          this.cache.set('engineeringCss', this.engineeringCSs, {
            type: 's',
            expire: 300,
          });
          this.cache.set('sales', this.sales, { type: 's', expire: 300 });
        },
      );
    } else {
      this.cache.get<any>('engineeringCss').subscribe(res => {
        res.forEach(element => {
          this.engineeringCSs.push(element);
        });
      });
      this.cache.get<any>('engineers').subscribe(res => {
        res.forEach(element => {
          this.engineers.push(element);
        });
      });
      this.cache.get<any>('sales').subscribe(res => {
        res.forEach(element => {
          this.sales.push(element);
        });
      });
    }
  }
  simpleGetData() {
    this.loading = true;
    this.http
      .get(`home/ProjectSearchByProjectNo`, {
        projectNo: this.inputJobno.trim(),
      })
      .subscribe(
        res => {
          if (res.Message === 'OK') {
            this.pts = res.Items;
            const totalLoad = this.documents.reduce(
              (arr, cur) => arr + cur.workload,
              0,
            );
            this.pts.forEach(item => {
              if (item.SetDocuments) {
                const arr = item.SetDocuments.split('_');
                const actual = this.documents
                  .filter(f => arr.includes(f.name))
                  .reduce((acc, cur) => acc + cur.workload, 0);
                item.ProgressPercent = (actual * 100) / totalLoad;
              }
            });
            console.log(res.Items);
          } else {
            this.pts = [];
            this.msg.error(res.Message);
          }
          this.loading = false;
          console.log(this.pts);
        },
        err => {
          this.pts = [];
          this.loading = false;
        },
      );
  }

  AdvancedGetData() {
    this.loading = true;
    console.log(this.sf.value);
    const sfv = this.sf.value;
    
    
    if(this.sf.value.IsFinished===false){
      sfv.CompleteDateFrom=null;
      sfv.CompleteDateTo=null;
    }else{
      if (sfv.OpenDateFromTo) {
        sfv.OpenDateFrom = this.sf.value.OpenDateFromTo[0];
        sfv.OpenDateTo = this.sf.value.OpenDateFromTo[1];
      }
      if (sfv.CompleteDateFromTo) {
        sfv.CompleteDateFrom = this.sf.value.CompleteDateFromTo[0];
        sfv.CompleteDateTo = this.sf.value.CompleteDateFromTo[1];
      }
    }
    console.log(sfv);
    this.http.get('home/projectsbyfilter', sfv).subscribe(
      res => {
        if (res.Message === 'OK') {
          this.pts = res.Items;
          const totalLoad = this.documents.reduce(
            (arr, cur) => arr + cur.workload,
            0,
          );
          this.pts.forEach(item => {
            if (item.SetDocuments) {
              const arr = item.SetDocuments.split('_');
              const actual = this.documents
                .filter(f => arr.includes(f.name))
                .reduce((acc, cur) => acc + cur.workload, 0);
              item.ProgressPercent = (actual * 100) / totalLoad;
            }
          });
          this.msg.success(`成功搜索到${res.Items.length}个案子！`);
        } else {
          this.msg.success('搜索到0个案子！');
        }
        this.loading = false;
      },
      err => {
        this.msg.error('出错了');
        this.loading = false;
      },
      () => {
        this.loading = false;
        console.log(this.pts);
      },
    );
  }
  getData() {
    this.pts = [];
    if (!this.expandForm) {
      this.simpleGetData();
    } else {
      this.AdvancedGetData();
    }
  }
  stChange(e: STChange) {
    // console.log(e);
    if (e.checkbox) {
      this.selectRows = e.checkbox;
      this.cdr.detectChanges();
      console.log(this.selectRows);
    }
    if (e.type === 'ps') {
      this.st.reload();
      console.log('page change');
    }
  }
  filterData() {}
  setTarget() {}
  cancelTarget() {}
  listTarget() {
    this.loading = true;
    this.http
      .get('home/projectsbyfilter', { TobeFinishedFlag: true })
      .subscribe(
        res => (this.pts = res.Items),
        err => {},
        () => (this.loading = false),
      );
  }
  filterNoneSetting() {
    if (this.settingChoose === '只显示未设置项目') {
      this.pts = this.pts.filter(
        c =>
          c.BType === 'Unknown' ||
          c.CType === 'Unknown' ||
          c.RType === 'Unknown'
      );
      this.settingChoose = '显示全部项目';
    } else {
      this.getData();
      this.settingChoose = '只显示未设置项目';
    }
  }
  setRows(params: { property: string; type: any }[]) {
    if (this.selectRows.length < 1) {
      this.msg.warning('未选中任何Job！');
    } else {
      this.loading = true;
      params.forEach(para => {
        this.selectRows.map(c => Reflect.set(c, para.property, para.type));
      });

      console.log(this.selectRows);
      this.http
        .put('home/projects/updatecollection', this.selectRows)
        .subscribe(
          res => {
            console.log(res);
            if (res.Message === 'OK') {
              this.msg.success('成功！');
              this.loading = false;

              this.getData();
              this.cdr.detectChanges();
              console.log(res.Items);
            } else {
              this.msg.success('失败！');
              this.loading = false;
            }
          },
          err => {},
          () => {},
        );
    }
  }
  exportExcel(){
    const data = [this.ptColumns.map(i => i.title)];
    this.pts.forEach(i =>
      data.push(this.ptColumns.map(c => i[c.index as string])),
    );
    this.xlsx.export({
      sheets: [
        {
          data: data,
          name: 'sheet name',
        },
      ],
    });
  }
}
