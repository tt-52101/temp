import { SFSchema } from '@delon/form';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-routes-components-project-drawer-view',
  templateUrl: './project-drawer-view.component.html',
})
export class RoutesComponentsProjectDrawerViewComponent implements OnInit {
  
  isAdmin=false;
  i: any;

  constructor(
    private drawer: NzDrawerRef,
    public msg: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userO = JSON.parse(user);
    console.log(userO);
    this.isAdmin=userO.Roles.some(p=>p==='Admin'||p==='Super Admin'||p==='God');
  }
  pSchema: SFSchema = {
    properties: {
      
      CType: {
        type: 'string',
        title: '客户类型',
        ui: {
          widget: 'radio',
          asyncData: () =>
            of([
              { label: '普通客户', value: 'Normal' },
              { label: 'VIP客户', value: 'VIP' },
              { label: 'Agent客户', value: 'Agent' },
              { label: '未知', value: null },
            ]).pipe(delay(100)),
          change: console.log,
        },
        default: '',
      },
      BType: {
        type: 'string',
        title: '业务类型',
        ui: {
          widget: 'radio',
          asyncData: () =>
            of([
              { label: '安规', value: 'Safety' },
              { label: '能效', value: 'EE' },
              { label: '化学', value: 'Chemical' },
              { label: '未知', value: 'Unknown' },
            ]).pipe(delay(100)),
          change: console.log,
        },
        default: '',
      },
      RType: {
        type: 'string',
        title: '区域类型',
        ui: {
          widget: 'radio',
          asyncData: () =>
            of([
              { label: '欧洲', value: 'IEC' },
              { label: '北美', value: 'US' },
              { label: 'GMAP', value: 'GMAP' },
              { label: '未知', value: 'Unknown' },
            ]).pipe(delay(100)),
          change: console.log,
        },
        default: '',
      },
      ManualProgress: {
        type: 'string',
        title: '当前进度',
        ui: {
          widget: 'radio',
          asyncData: () =>
            of([
              { label: 'Testing', value: 'Testing' },
              { label: 'Reporting', value: 'Reporting' },
              {
                label: 'Waiting for Documents',
                value: 'Waiting for Documents',
              },
              { label: 'Apply Certificate', value: 'Apply Certificate' },
              { label: 'Waiting for FI', value: 'Waiting for FI' },
              {
                label: 'Waiting for Confirmation',
                value: 'Waiting for Client Confirmation',
              },
              {
                label: 'Waiting for Modification',
                value: 'Waiting for Client Modification',
              },
              { label: 'Apply Termination', value: 'Apply Termination' },
            ]).pipe(delay(100)),
          change: console.log,
        },
      },
      ActualWorkloadFactor:{type:'number',title:'工作量系数',minimum:0,maximum:5},
      TobeFinishFlag: {
        type: 'boolean',
        title: '是否本月完成',
        ui: {
          widget: 'radio',
          asyncData: () =>
            of([
              { label: '能', value: true },
              { label: '不能', value: false },
            ]).pipe(delay(100)),
        },
      },

    },
    
  };

  save(value: any) {
    console.log(value);
    this.http.put('home/project', value).subscribe(
      res => {
        if (res.Message === 'OK') {
          this.msg.success('保存成功');
        } else {
          this.msg.warning('出了点问题');
        }
      },
      err => {},
      () => {
        this.drawer.close(value);
      },
    );
  }

  
}
