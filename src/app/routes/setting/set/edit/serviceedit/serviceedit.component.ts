import { SyneltsService } from './../../../../../services/biz/SyneltsService';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFSchemaEnum, SFSchemaEnumType } from '@delon/form';
import { Documents } from 'app/services/biz/Document';

@Component({
  selector: 'app-setting-set-edit-serviceedit',
  templateUrl: './serviceedit.component.html',
})
export class SettingSetEditServiceeditComponent implements OnInit {
  submitting = false;
  i: any = {};
  documents: any[] = [];
  docString: SFSchemaEnumType[] = [];
  schema: SFSchema = {
    properties: {
      Name: { type: 'string', title: '服务名称', maxLength: 100 },

      BusinessType: {
        type: 'string',
        title: '业务类型',
        enum: [
          { value: 'Safety', label: '安规' },
          { value: 'Energy Efficiency', label: '能效' },
          { value: 'Chemical', label: '化学' },
          { value: ' ', label: '不确定' },
        ],
      },
      RegionType: {
        type: 'string',
        title: '区域类型',
        enum: [
          { value: 'US', label: '北美' },
          { value: 'IEC', label: '欧洲' },
          { value: 'GMAP', label: '多国' },
          { value: ' ', label: '不确定' },
        ],
      },
      Description: {
        type: 'string',
        title: '描述',
        maxLength: 100,
      },
      DefaultRequiredWorkingDays: {
        type: 'number',
        title: '预设周期（工作日）',
      },
      RequiredDocumentsString: {
        type: 'string',
        title: '默认需求文件',
        enum: ["Applicaion Form", "CDR Report", "Photos", "TRF Report",
         "CC Report", "Construction Review Sheet","Test Record", 
         "Subcontract Report", "Client Technical Documents", "Declarations", 
         "Client Confirmation", "Pahs Evaluation Sheet", "Pahs Test Report", 
         "Test Plan for GS", "Certificate Template", "Label", 
         "Instruction Manual-English Version", "Instruction Manual-Native Version"],
        ui: {
          widget: 'checkbox',
          span: 8,
        },
      },
    },
    required: ['Name'],
  };
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private modal: NzModalRef,
  ) {}

  ngOnInit() {
    console.log(this.i);
    this.http.get('assets/tmp/documents.json').subscribe(
      res => {
        this.documents = res;
        this.docString = [];
        console.log(this.documents);
        this.documents.forEach(item => {
          this.docString.push(item.name);
        });
        console.log(this.docString);
      },
      err => {},
      () => console.log(this.docString),
    );
  }
  save(value: any) {
    console.log(value);
    this.handleEnum(value);
    this.http
      .put('service/updatesingle', value)
      .subscribe(res => {}, err => {}, () => {});
    this.msg.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }
  handleEnum(service: SyneltsService) {
    let st='';
    if(service.RequiredDocumentsString.length>0){
      service.RequiredDocumentsString.forEach(item=>{
        st+=item+'_';
      })
    }
    if(st.endsWith('_')){
      st=st.substring(0,st.length-1);
    }
    service.RequiredDocuments=st;
  }
}
