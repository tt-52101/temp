import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STData, STColumn, STChange } from '@delon/abc';
import { SettingSetEditServiceeditComponent } from '../edit/serviceedit/serviceedit.component';

@Component({
  selector: 'app-setting-set-serviceset',
  templateUrl: './serviceset.component.html',
})
export class SettingSetServicesetComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private modal: ModalHelper,
  ) {}
  @ViewChild('st')
  private readonly st: STComponent;
  expandForm = false;
  loading = false;
  checkloading = false;
  inputServiceName = '';
  selectStatus = 0;
  params = {
    BusinessType: 'Safety',
    RegionType: 'US',
    Name: '',
  };
  status = [{ index: 0, text: '未设置' }, { index: 1, text: '已设置' }];

  BusinessTypes = [
    { index: 0, text: '普通客户', value: 'Normal' },
    { index: 1, text: 'VIP', value: 'VIP' },
    { index: 2, text: 'Agent', value: 'Agent' },
  ];
  RegionTypes = [
    { index: 0, text: '普通客户', value: 'Normal' },
    { index: 1, text: 'VIP', value: 'VIP' },
    { index: 2, text: 'Agent', value: 'Agent' },
  ];
  startDate: Date = new Date();
  services = [];
  selectServices: STData[] = [];
  columns: STColumn[] = [
    {
      title: '序号',
      index: 'Id',
      type: 'checkbox',
    },
    {
      title: '服务',
      index: 'Name',
      sort: {
        compare: (a: any, b: any) => (a.Name > b.Name ? 1 : -1),
      },
    },
    {
      title: '业务类型',
      index: 'BusinessType',
      sort: {
        compare: (a: any, b: any) => (a.BusinessType > b.BusinessType ? 1 : -1),
      },
    },
    {
      title: '区域类型',
      index: 'RegionType',
      sort: {
        compare: (a: any, b: any) => (a.RegionType > b.RegionType ? 1 : -1),
      },
    },
    {
      title: '预设项目周期',
      index: 'DefaultRequiredWorkingDays',
      type:'number',
      className:'text-center',
      sort: {
        compare: (a: any, b: any) => a - b,
      },
    },
    {
      title: '',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingSetEditServiceeditComponent,
            size: 'lg',
            paramsName: 'i',
          },
          click: 'load',
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            // this.http.delete(`${this.url}`, { id: i.id }).subscribe(() => {
            //   this.msg.success('Success');
            //   c.removeRow(i);
            // });
          },
        },
      ],
    },
  ];
  ngOnInit() {}
  change(e: STChange) {
    if (e.checkbox) {
      this.selectServices = e.checkbox;
      this.cdr.detectChanges();
      console.log(this.selectServices);
    }
  }
  getData() {
    this.checkloading = true;
    this.loading = true;
    if (this.expandForm) {
      if (this.selectStatus === 0) {
        this.params.BusinessType = '';
        this.params.RegionType = '';
      }

      this.http.get('service/collectionByFilter', this.params).subscribe(
        res => {
          this.services = [...res];
          this.cdr.detectChanges();
        },
        err => {
          this.checkloading = false;
          this.loading = false;
          this.msg.error('服务器出错！');
        },
        () => {
          this.checkloading = false;
          this.loading = false;
          this.msg.success('数据获取成功！');
        },
      );
    } else {
      this.params.Name = this.inputServiceName;
      this.params.BusinessType = '';
      this.params.RegionType = '';
      console.log(this.params);
      this.http.get('service/collectionByFilter', this.params).subscribe(
        res => {
          this.services = res;
          console.log(this.services);
          this.cdr.detectChanges();
        },
        err => {
          this.checkloading = false;
          this.loading = false;
          this.msg.error('服务器出错！');
        },
        () => {
          this.checkloading = false;
          this.loading = false;
          this.msg.success('数据获取成功！');
        },
      );
    }
  }

  setNormal() {
    // if(this.selectServices.length>0){
    //   this.selectServices.map(c=>c.bu='Normal');
    //   this.http.put('service/updatecollection',this.selectServices).subscribe(res=>{
    //     console.log(res);
    //     if(res.message==='OK'){
    //       this.msg.info('done');
    //     }
    //   },
    //   err=>{
    //     this.msg.error(JSON.stringify(err));
    //   },
    //   ()=>{
    //     this.getData();
    //   });
    // }
  }
  setVIP() {
    if (this.selectServices.length > 0) {
      this.selectServices.map(c => (c.ClientType = 'VIP'));
      this.http.put('client/updatecollection', this.selectServices).subscribe(
        res => {
          console.log(res);
          if (res.message === 'OK') {
            this.msg.info('done');
          }
        },
        err => {
          this.msg.error(JSON.stringify(err));
        },
        () => {
          this.getData();
        },
      );
    }
  }
  setAgent() {
    if (this.selectServices.length > 0) {
      this.selectServices.map(c => (c.ClientType = 'Agent'));
      this.http.put('client/updatecollection', this.selectServices).subscribe(
        res => {
          console.log(res);
          if (res.message === 'OK') {
            this.msg.info('done');
          }
        },
        err => {
          this.msg.error(JSON.stringify(err));
        },
        () => {
          this.getData();
        },
      );
    }
  }
  createClient() {
    this.modal
      .createStatic(SettingSetServicesetComponent, {}, { size: 'lg' })
      .subscribe(() => this.st.reload());
  }
  reset() {
    this.inputServiceName = '';
    this.params.BusinessType = '';
    this.params.RegionType = '';
    this.selectStatus = -1;
    this.selectServices = [];
  }
}
