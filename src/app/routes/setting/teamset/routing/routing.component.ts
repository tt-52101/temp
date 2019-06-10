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
  TagSelectComponent,
} from '@delon/abc';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { SettingImportEditProjectComponent } from '../../import/edit/project/project.component';
import { SettingImportEditRecordsComponent } from '../../import/edit/records/records.component';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { ConstantPool } from '@angular/compiler';
import { of } from 'rxjs';
import { __getInputValues } from '@angularclass/hmr';

@Component({
  selector: 'app-setting-teamset-routing',
  templateUrl: './routing.component.html',
})
export class SettingTeamsetRoutingComponent implements OnInit {
  expandForm = false;
  inputJobno = '';
  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: SFComponent;
  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    private drawer: DrawerHelper,
    public cache: CacheService,
    private cdr: ChangeDetectorRef,
  ) {}
  // forms
  users = [];
  engineers = [];
  engineeringCSs = [];
  selectRows: STData[] = [];
  sales = [];
  Services = [];
  progressTypes = [
    { label: '未完成', value: false },
    { label: '已完成', value: true },
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
          asyncData: (input: string) =>
            of(
              input
                ? this.Services.filter(c => c.toLowerCase().indexOf(input) > -1)
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
        ui: { widget: 'date', mode: 'range' },
      },
      CompleteDateFromTo: {
        type: 'string',
        title: '结案时间',
        ui: { widget: 'date', mode: 'range' },
      },
      Progress: {
        type: 'boolean',
        title: '完成度',
        enum: this.progressTypes,
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
  tags: STColumnTag = {
    'Safety': { text: 'Safety', color: 'success' },
    'Energy Efficiency': { text: 'Energy Efficiency', color: 'red' },
    'Chemical': { text: 'Chemical', color: 'blue' },
    'IEC': { text: 'IEC', color: 'blue' },
    'US': { text: 'US', color: 'purple' },
    'GMAP': { text: 'GMAP', color: 'orange' },
    'VIP': { text: 'VIP', color: 'red' },
    'Normal': { text: 'Normal', color: 'blue' },
    'Agent': { text: 'Agent', color: 'volcano' },
    '':{text:'未知',color:'red'}
  };
  ptColumns: STColumn[] = [
    {
      title: '序号',
      index: 'Id',
      type: 'checkbox',
    },
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
      title: 'Type',
      index: ['BType', 'CType', 'RType'],
      type: 'tag',
      tag: this.tags,
    },
    {
      title: '',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingImportEditProjectComponent,
            paramsName: 'i',
            size: 'lg',
          },
          click: (i, m, c) => {
            if (!this.expandForm) {
              this.simpleGetData();
            } else {
            }
          },
        },
        {
          icon: 'ordered-list',
          type: 'modal',
          modal: {
            component: SettingImportEditRecordsComponent,
            paramsName: 'i',
            size: 'lg',
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
    this.http.get('service/collectionbyfilter', { Name: '' }).subscribe(res => {
      console.log(res);
      res.forEach(element => {
        this.Services.push(element.Name);
      });
      console.log(this.Services);
    });
    console.log(this.Services);
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

    // this.getData('joh');
  }
  simpleGetData() {
    this.http
      .get(`home/ProjectSearchByProjectNo`, {
        projectNo: this.inputJobno.trim(),
      })
      .subscribe(res => {
        if (res.Message === 'OK') {
          this.pts = res.Items;
        } else {
          this.msg.error(res.Message);
        }
      });
  }

  AdvancedGetData() {
    this.loading = true;
    console.log(this.sf.value);
    const sfv = this.sf.value;
    if (sfv.OpenDateFromTo) {
      sfv.OpenDateFrom = this.sf.value.OpenDateFromTo[0];
      sfv.OpenDateTo = this.sf.value.OpenDateFromTo[1];
    }
    if (sfv.CompleteDateFromTo) {
      sfv.CompleteDateFrom = this.sf.value.CompleteDateFromTo[0];
      sfv.CompleteDateTo = this.sf.value.CompleteDateFromTo[1];
    }

    console.log(sfv);
    this.http.get('home/projectsbyfilter', sfv).subscribe(
      res => {
        if (res.length > 0) {
          this.pts = res;
        } else {
          this.msg.success('搜索到0个案子！');
        }
      },
      err => {
        this.msg.error('出错了');
        this.loading = false;
      },
      () => {
        this.loading = false;
      },
    );
  }
  getData() {
    if (!this.expandForm) {
      this.simpleGetData();
    } else {
      this.AdvancedGetData();
    }
  }
  stChange(e: STChange) {
    if (e.checkbox) {
      this.selectRows = e.checkbox;
      this.cdr.detectChanges();
      console.log(this.selectRows);
    }
  }
  filterData() {}
  setTarget() {}
  cancelTarget() {}
  listTarget() {}

  setRows(params: { property: string; type: any }[]) {
    this.loading = true;
    params.forEach(para => {
      this.selectRows.map(c => Reflect.set(c, para.property, para.type));
    });

    console.log(this.selectRows);
    this.http.put('home/projects/updatecollection', this.selectRows).subscribe(
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
