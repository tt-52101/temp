
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFComponent, SFSchema } from '@delon/form';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { SyneltsRole } from 'app/services/biz/SyneltsRole';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting-teamset-edit-staff',
  templateUrl: './staff.component.html',
})
export class SettingTeamsetEditStaffComponent implements OnInit {
  constructor(private http: _HttpClient,private modal:NzModalRef, public msg:NzMessageService) {}
  loading = false;
  i: any = {};
  @ViewChild('sf') sf: SFComponent;
  ngOnInit() {}
  pSchema: SFSchema = {
    properties: {
      Name: { type: 'string', title: 'Name', maxLength: 20 },
      Email: { type: 'string', title: 'Email', maxLength: 20 },
      SyneltsRoles: {
        type: 'string',
        title: 'Mulit',
        enum: ['Engineer',  'EngineeringCS', 'Sales','SalesCS'],
        ui: {
          widget: 'checkbox',
          span: 8,
        },
        default: ['Engineer'],
      },
      IsCurrentOnJob: { type: 'boolean', title: 'On Job' },
    },
  };
  formSubmit(item: any) {
    console.log(item);
    
    item.SyneltsRole=this.handleSubData(item);
    console.log(item);
    this.http.put('person/user',item).subscribe(
      res=>{
        if(res.Message==='OK'){
          this.msg.success('成功');
        }else{
          this.msg.success(res.Message);
        }
      },
      err=>{},
      ()=>{
        this.modal.close();
      }
    );
  }
  private handleSubData(res: SyneltsUser) {
    if (res.SyneltsRoles.length > 1) {
      let st = '';
      res.SyneltsRoles.forEach(item => {
        st += SyneltsRole[item];
      });
      if(st.startsWith('0')){
        const n= st.substring(1,st.length)+'0';
        return parseInt(n,10);
      }
      return parseInt(st, 10);
    } else {
      return SyneltsRole[res.SyneltsRoles[0]];
    }
  }
}