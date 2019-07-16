import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { ProgressType } from 'app/services/biz/ProgressType';

@Component({
  selector: 'app-routes-dashboards-progress',
  templateUrl: './progress.component.html',
})
export class RoutesDashboardsProgressComponent implements OnInit {
  progressTypes: any[] = [];
  i: any;
  schema: SFSchema = {
    properties: {
      ProjectNo: { type: 'string', title: '项目号',readOnly:true },
      ClientName: { type: 'string', title: '客户名',readOnly:true },
      Product: { type: 'string', title: '产品',readOnly:true },
      ServiceNames: { type: 'string', title: '服务',readOnly:true },
      ManualProgress: {
        type: 'string',
        title: '进度',
        enum: this.progressTypes,
        description:'为项目打上进度标签，便于分类管理',
        ui: {
          widget: 'select',
        },
      },
    },
    required:['ManualProgress']
  };

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    console.log(this.i);
    ProgressType.map(o =>
      this.progressTypes.push({
        label: o,
        value: o,
      }),
    );
    console.log(this.progressTypes);
    // if (this.record.id > 0)
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    this.http.put(`home/project`, value).subscribe(res => {
      if(res.Message==='OK'){
        this.msg.success('保存成功');
      this.modal.close(value);
    }
    });
  }

  close() {
    this.modal.destroy();
  }
}
