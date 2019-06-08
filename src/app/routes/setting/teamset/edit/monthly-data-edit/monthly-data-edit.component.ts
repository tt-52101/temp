import { SFSchema } from '@delon/form';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-teamset-edit-monthly-data-edit',
  templateUrl: './monthly-data-edit.component.html',
})
export class SettingTeamsetEditMonthlyDataEditComponent implements OnInit {
  submitting = false;
  i: any = {};
  schema: SFSchema = {
    properties: {
      Month: { type: 'string', title: '月份', maxLength: 50 },

      Budget: {
        type: 'number',
        title: '预算计划',
      },
      Actual: {
        type: 'number',
        title: '实际完成',
      },
    },
    required: ['Month', 'Budget'],
  };
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private modal: NzModalRef,
  ) {}

  ngOnInit() {}
  save(value: any) {
    console.log(value);
    this.http
      .put('service/updatesingle', value)
      .subscribe(res => {}, err => {}, () => {});
    this.msg.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }
}
