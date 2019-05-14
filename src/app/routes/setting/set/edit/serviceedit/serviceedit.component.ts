import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-setting-set-edit-serviceedit',
  templateUrl: './serviceedit.component.html',
})
export class SettingSetEditServiceeditComponent implements OnInit {

  submitting = false;
  i:any={};
  schema:SFSchema={
    properties: {
      Name: { type: 'string', title: '服务名称', maxLength: 100 },
      
      BusinessType: {
        type: 'string',
        title: '业务类型',
        enum: [
          { value: 'Safety', label: '安规' },
          { value: 'Energy Efficiency', label: '能效' },
          { value: 'Chemical', label: '化学' },
        ],
      },
      RegionType: {
        type: 'string',
        title: '区域类型',
        enum: [
          { value: 'US', label: '北美' },
          { value: 'IEC', label: '欧洲' },
          { value: 'GMAP', label: '多国' },
        ],
      },
      Description:{
        type:'string',
        title:'描述',
        maxLength:100
      },
      DefaultRequiredWorkingDays:{
        type:'number',
        title:'预设周期（工作日）',
        
      }
      
    },
    required: ['Name', 'BusinessType','RegionType'],
    
  };
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private modal:NzModalRef
  ) {}

  ngOnInit() {
    
  }
  save(value: any) {
    console.log(value);
    this.msg.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }

}
