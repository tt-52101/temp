import { NzMessageService } from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';

@Component({
  selector: 'app-setting-import-batchimport',
  templateUrl: './batchimport.component.html',
})
export class SettingImportBatchimportComponent implements OnInit, OnChanges {
  private _inputValue: string;
  @Input() set inputValue(value: string) {
    if (this._inputValue !== value) {
      this._inputValue = value;
      this.inputObjs = JSON.parse(value);
      this.pCount = this.inputObjs.length;
      this.pTime = this.inputObjs.length * 0.2;
    }
  }
  get inputValue() {
    return this._inputValue;
  }

  layout: 'vertical';
  inputObjs: ProjectTransfer[];
  pCount = 0;
  pTime = 0;
  loading = false;
  disabled = false;
  inputSetting = { minRows: 10, maxRows: 15 };
  constructor(private http: _HttpClient, private message: NzMessageService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.inputValue.currentValue);
  }
  import() {
    this.loading = true;
    this.disabled = true;
    if (
      this.inputObjs === undefined ||
      this.inputObjs.length === 0 ||
      this.inputObjs === null
    ) {
      this.message.warning('还没有内容呢！');
      return;
    }
    setTimeout(() => {}, 1000);
    this.http
      .post('home/projects/addandupdatecollection', this.inputObjs)
      .subscribe(
        res => {
          this.message.info(res);
          console.log(res);
        },
        err => {
          console.log(err);
          this.disabled = false;
          this.loading = false;
        },
        () => {
          this.disabled = false;
          this.loading = false;
        },
      );
  }
}
