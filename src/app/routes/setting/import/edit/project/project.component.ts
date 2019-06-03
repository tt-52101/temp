import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-setting-import-edit-project',
  templateUrl: './project.component.html',
})
export class SettingImportEditProjectComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  i: any = {};
  schema: SFSchema = {
    properties: {
      ProjectNo: { type: 'string', title: 'Job No', maxLength: 12 },
      QuotationNo: { type: 'string', title: 'Quotation No', maxLength: 13 },
      ClientName: { type: 'string', title: 'Client', maxLength: 100 },
      Product: { type: 'string', title: 'Product' },
      ServiceNames: { type: 'string', title: 'Services' },
      QuotedFee: { type: 'number', title: 'Fee', ui: { prefix: '￥' } },
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
              { label: '未知', value: '' },
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
              { label: '能效', value: 'Energy Efficiency' },
              { label: '化学', value: 'Chemical' },
              { label: '未知', value: '' },
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
              { label: '欧洲', value: 'EU' },
              { label: '北美', value: 'US' },
              { label: 'GMAP', value: 'GMAP' },
              { label: '未知', value: '' },
            ]).pipe(delay(100)),
          change: console.log,
        },
        default: '',
      },
    },
  };
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private modal: NzModalRef,
  ) {}

  ngOnInit() {}
  save(value: any) {
    console.log(value);
    this.http
      .put('client/updatesingle', value)
      .subscribe(res => {}, err => {}, () => {});
    this.msg.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }
}
