import { mergeMap } from 'rxjs/operators';
import { Validators, EmailValidator } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NzMessageService, NzDrawerRef } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-user-manage-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserManageUserEditComponent implements OnInit {
  
  id = this.route.snapshot.params.id;
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: 'User Name',
     
    },
      
      SyneltsName: { type: 'string', title: 'Synelts Name'},
      Roles: { 
        type: 'string', 
        title: 'Roles', 
        enum:[
          {label:'上帝',value:'God'},
          {label:'超级管理员',value:'Super Admin'},
          {label:'管理员',value:'Admin'},
          {label:'普通用户',value:'General Staff'},
        ],
        
      },
      Email: { type: 'string', title: 'Email',format:'email' },
      SelfDescription: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['name', 'SyneltsName', 'Roles'],
    
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
    },
    $name:{
      autofocus:true,
      validator:(data:string)=>{
        if(!data.toLocaleLowerCase().endsWith('@intertek.com')){
          return [{keyword:'格式错误',message:'只能是intertek邮件地址'}]
        }
      }
    },
    $Roles: {
      widget: 'checkbox',
    },
    $SelfDescription: {
      widget: 'textarea',
      
    },
  };

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private drawer:NzDrawerRef,
  ) {
    if(!this.i){
      this.i={name:'New.User@intertek.com'};
    }
  }

  ngOnInit(): void {
   console.log(this.i);
  }

  save(value: any) {
    value.Email=value.name;
    if(value.Id){
      this.http.post(`auth/user`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.drawer.close(value);
      });
    }else{
      value.SecuredPwd='Abc123456';
      this.http.post('auth/register',value).subscribe(
        res=>{
          this.msgSrv.success('保存成功');
        this.drawer.close(value);
        }
      )
    }
    
  }
}
