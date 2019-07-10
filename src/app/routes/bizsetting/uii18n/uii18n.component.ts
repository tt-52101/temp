import { Component,OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd';
import { DemoModalComponentComponent } from '@shared/components/demo-modal-component/demo-modal-component.component';
import { DemoDrawerComponentComponent } from '@shared/components/demo-drawer-component/demo-drawer-component.component';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'app-bizsetting-uii18n',
  templateUrl: './uii18n.component.html',
})
export class BizsettingUIi18nComponent implements OnInit {

  constructor(private http: _HttpClient,private message: NzMessageService) { }

  ngOnInit() { }
  users: any[] = [
    {
      'name':'menu.app.aen',
      'en-us':'nothing',
      'zh-cn':'没什么'
    },
    {
      'name':'menu.app.aen',
      'en-us':'nothing',
      'zh-cn':'没什么'
    },
    {
      'name':'menu.app.aen',
      'en-us':'nothing',
      'zh-cn':'没什么'
    },
  ];
  columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '键名', index: 'en-us' },
    { title: '键值', index: 'zh-cn' },
    {
      title: '操作区',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: DemoModalComponentComponent,
          },
          click: (record: any, modal: any) =>
            this.message.success(
              `重新加载页面，回传值：${JSON.stringify(modal)}`,
            ),
        },
        
        {
          icon: 'delete',
          type: 'del',
          click: (record, modal, comp) => {
            this.message.success(`成功删除【${record.name}】`);
            comp.removeRow(record);
          }
        }
      ]}
  ]

}
