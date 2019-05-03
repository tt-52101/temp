import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
  record: any = {};

  constructor(public msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    this.http.get(`home/dbstatus`).subscribe(res => (this.record = res));
  }

  close() {}
}
