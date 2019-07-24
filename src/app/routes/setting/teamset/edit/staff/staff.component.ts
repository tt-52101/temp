import { ACLService } from '@delon/acl';

import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFComponent, SFSchema } from '@delon/form';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { SyneltsRole } from 'app/services/biz/SyneltsRole';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting-teamset-edit-staff',
  templateUrl: './staff.component.html',
})
export class SettingTeamsetEditStaffComponent implements OnInit,OnDestroy {
  constructor(private http: _HttpClient,private modal:NzModalRef,private modalService:NzModalService, 
    public msg:NzMessageService,public acl:ACLService) {}
  loading = false;
  i: any = {};
  @ViewChild('sf') sf: SFComponent;
  ngOnInit() {}
  pSchema: SFSchema = {
    properties: {
      Name: { type: 'string', title: 'Name', maxLength: 40,ui:{acl:'god'} },
      Email: { 
        type: 'string', 
        title: 'Email', 
        maxLength: 50,
        ui:{
          validator:(value:string)=>{
            if(value!==null&&value!==undefined&&(!value.endsWith('@intertek.com'))&&value.length!==0){
              return [{keyword:'error',message:'必须是intertek邮件地址'}];
            }
          },
          acl:'god'
        } 
      },
      SyneltsRoles: {
        type: 'string',
        title: '角色',
        enum: [{label:'工程师',value:'Engineer'},{label:'工程助理',value:'EngineeringCS'},{label:'销售',value: 'Sales'},{label:'销售助理',value:'SalesCS'}],
        ui: {
          widget: 'checkbox',
          span: 8,
        },
        default: ['Engineer'],
      },
      SubTeam: {
        type: 'string',
        title: '分组',
        enum: [
          {label:'安规',value:'safety'},
          {label:'能效',value:'ee'},
          {label:'化学',value:'chemical'},
          {label:'助理',value:'cs'},
      ],
        ui: {
          widget: 'select',
          span: 8,
        },
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
  notSave=false;
  showConfirm() {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Click OK will not save your changes',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnCancel:()=>this.notSave=true,
      nzOnOk:()=>this.notSave=false,
    });
  }
  ngOnDestroy(){
    
  }
}
