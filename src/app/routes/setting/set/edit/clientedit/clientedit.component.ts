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
  showInfo=false;
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
        maxLength:20
      },
      Address:{
        type:'string',
        title:'地址',
        maxLength:200,
      },
      ContactEmail:{
        type:'string',
        title:'电子邮箱',
        maxLength:100,
      },
      EntryDate:{
        type:'string',
        title:'首次合作时间',
       format:'date',
      },
      Phone:{
        type:'string',
        title:'电话',
        maxLength:100
      },
      MobilePhone:{
        type:'string',
        title:'手机',
        maxLength:11
      }
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
