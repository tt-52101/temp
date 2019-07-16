import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { SingleTask } from 'app/services/biz/SingleTask';

@Component({
  selector: 'app-routes-dashboards-task',
  templateUrl: './task.component.html',
})
export class RoutesDashboardsTaskComponent implements OnInit {
  
  i: any;
  persons:any[]=[];
  loading=false;
  schema: SFSchema = {
    properties: {
      Description: { type: 'string', title: '内容' },
      Due: { type: 'string', title: '日期', format:'date',},
      Starred: { type: 'boolean', title: '重要',ui:{optional:'可选'} },
      InformedPerson: { 
        type: 'string', 
        title: '通知人员', 
        enum:this.persons,
        ui:{
          widget:'select',
          mode:'tages',
          optional:'可选'
        },
        default:null,  
      },
      ProjectNo:{type:'string',title:'项目号',ui:{optional:'可选'}}
    },
    required: ['Description','Due'],
  };
  

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    this.i=new SingleTask();
  }

  save(value: any) {
    console.log(value);
    if(value.ProjectNo){
      this.http.post(`task/singlebyprojectno/${value.ProjectNo}`, value).subscribe(res => {
        if(res.Message==='OK'){
          this.msgSrv.success('保存成功');
        this.modal.close(value);
        }
        
      });
    }else{
      this.http.post(`task/single`, value).subscribe(res => {
        if(res.Message==='OK'){
          this.msgSrv.success('保存成功');
        this.modal.close(value);
        }
        
      });
    }
    
  }

  close() {
    this.modal.destroy();
  }
}
