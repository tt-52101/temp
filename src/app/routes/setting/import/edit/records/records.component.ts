import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-setting-import-edit-records',
  templateUrl: './records.component.html',
})
export class SettingImportEditRecordsComponent implements OnInit {
  constructor(private http: _HttpClient, private msg: NzMessageService) {}

  ngOnInit() {}
  i: any = {};
  delete(collection: [], item: any) {
    this.http.delete(`action/single/${item.Id}`).subscribe(
      res => {
        if (res.Message === 'OK') {
          this.msg.success('Deleted Successfully!');
          collection.splice(item.index, 1);
        }
      },
      err => {
        this.msg.error('something error');
      },
      () => {},
    );
  }
}
