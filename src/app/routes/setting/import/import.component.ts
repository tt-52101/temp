import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-setting-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less'],
})
export class SettingImportComponent implements OnInit {
  ngOnInit(): void {}

  constructor(public msg: NzMessageService) {}
}
