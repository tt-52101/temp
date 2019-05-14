import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-setting-set-edit-clientedit',
  templateUrl: './clientedit.component.html',
})
export class SettingSetEditClienteditComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  i:any={};
  schema:SFSchema={
    properties: {
      Name: { type: 'string', title: '客户名', maxLength: 100 },
      
      ClientType: {
        type: 'string',
        title: '客户类型',
        enum: [
          { value: 'Normal', label: '普通客户' },
          { value: 'VIP', label: 'VIP' },
          { value: 'Agent', label: 'Agent' },
        ],
      },
      Contact:{
        type:'string',
        title:'联系人',
        maxLength:10
      },
      
    },
    required: ['Name', 'ClientType'],
    
  };
  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
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
