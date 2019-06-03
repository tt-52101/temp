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
  selectBusinessType = 'Safety';
  selectRegionType = 'IEC';
  params = {
    BusinessType: 'Safety',
    RegionType: 'US',
    Name: '',
    SetAlready: false,
  };
  status = [{ index: 0, text: '未设置' }, { index: 1, text: '已设置' }];

  BusinessTypes = [
    { index: 0, text: '安规', value: 'Safety' },
    { index: 1, text: '能效', value: 'Energy Efficency' },
    { index: 2, text: '化学', value: 'Chemical' },
    { index: 3, text: '其他', value: '' },
  ];
  RegionTypes = [
    { index: 0, text: '欧线', value: 'IEC' },
    { index: 1, text: '美线', value: 'US' },
    { index: 2, text: 'GMAP', value: 'GMAP' },
    { index: 4, text: '其他', value: '' },
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
      type: 'number',
      className: 'text-center',
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
            size: 'md',
            paramsName: 'i',
          },
          click: 'load',
        },
        {
          icon: 'delete',
          type: 'del',
          popTitle:'删除请慎重！',
          click: (i, m, c) => {
            this.http.delete(`service/singlebyid/${i.Id}`).subscribe(
              res => {
                if (res === 'Deleted') {
                  this.msg.success(res);
                }
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
        this.params.SetAlready = false;
        this.params.Name = '';
      } else {
        this.params.Name = '';
        this.params.SetAlready = true;
        this.params.BusinessType = this.selectBusinessType;
        this.params.RegionType = this.selectRegionType;
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
      if (this.inputServiceName === '') {
        this.msg.warning('输入为空！');
        this.checkloading = false;
        this.loading = false;
        return;
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
  }

  setService(type: string) {
    switch (type) {
      case 'Safety':
        this.selectServices.map(c => {
          c.BusinessType = 'Safety';
        });
        break;
      case 'SafetyUS':
        this.selectServices.map(c => {
          c.BusinessType = 'Safety';
          c.RegionType = 'US';
        });
        break;
      case 'SafetyIEC':
        this.selectServices.map(c => {
          c.BusinessType = 'Safety';
          c.RegionType = 'IEC';
        });
        break;
      case 'SafetyGMAP':
        this.selectServices.map(c => {
          c.BusinessType = 'Safety';
          c.RegionType = 'GMAP';
        });
        break;
      case 'Chemical':
        this.selectServices.map(c => {
          c.BusinessType = 'Chemical';
        });
        break;
      case 'EE':
        this.selectServices.map(c => {
          c.BusinessType = 'Energy Efficiency';
        });
        break;
      case 'EEUS':
        this.selectServices.map(c => {
          c.BusinessType = 'Energy Efficiency';
          c.RegionType = 'US';
        });
        break;
      case 'EEIEC':
        this.selectServices.map(c => {
          c.BusinessType = 'Energy Efficiency';
          c.RegionType = 'IEC';
        });
        break;
      case 'EEGMAP':
        this.selectServices.map(c => {
          c.BusinessType = 'Energy Efficiency';
          c.RegionType = 'GMAP';
        });
        break;
    }
    // if (type === 'US' || type === 'IEC') {
    //   this.selectServices.map(c => (c.RegionType = type));
    // } else {
    //   this.selectServices.map(c => (c.BusinessType = type));
    // }

    this.http.put('service/updatecollection', this.selectServices).subscribe(
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

  createService() {
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
