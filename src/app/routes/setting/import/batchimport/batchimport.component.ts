import { HttpClient } from '@angular/common/http';
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
import { zip, forkJoin, Observable, of, from } from 'rxjs';
import { zipAll, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-setting-import-batchimport',
  templateUrl: './batchimport.component.html',
})
export class SettingImportBatchimportComponent implements OnInit, OnChanges {
  private _inputValue: string;
  @Input() set inputValue(value: string) {
    if (this._inputValue !== value) {
      this._inputValue = value;
      let c = JSON.parse(value);
      if (c !== null) {
        this.inputObjs = JSON.parse(value);
        this.pCount = this.inputObjs.length;
        this.pTime = this.inputObjs.length * 0.2;
      }
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
    const urlcalls = [];
    urlcalls.push('person/SimpleCreateByProjects');
    urlcalls.push('home/Client/addandupdatecollection');
    urlcalls.push('home/Service/addandupdatecollection');

    zip(
      this.http.post('person/SimpleCreateByProjects', this.inputObjs),
      this.http.post('home/Service/addandupdatecollection', this.inputObjs),
      this.http.post('home/Client/addandupdatecollection', this.inputObjs),
    ).subscribe(
      ([serviceRes, clientRes, personRes]) => {
        console.log(serviceRes);
        console.log(clientRes);
        console.log(personRes);
      },
      err => {
        this.loading = false;
        this.disabled = false;
      },
      () => {
        this.http
          .post('home/Projects/addandupdatecollection', this.inputObjs)
          .subscribe(
            res => console.log(res),
            err => {
              this.loading = false;
              this.disabled = false;
            },
            () => {
              this.loading = false;
              this.disabled = false;
              this.message.info('完成了');
            },
          );
      },
    );
  }
}
