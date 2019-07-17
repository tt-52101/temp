import { toBoolean } from '@delon/util';
import { SFSchema, SFUISchema, SFUISchemaItem } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { _HttpClient } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { zip } from 'rxjs';
import { syntaxError } from '@angular/compiler';
import { format } from 'date-fns';

@Component({
  selector: 'app-setting-import-batchimport',
  templateUrl: './batchimport.component.html',
})
export class SettingImportBatchimportComponent implements OnInit, OnChanges {
  revenueMonth:Date;
  theYear = new Date().getFullYear().toString();
  theMonth = (new Date().getMonth() + 1).toString();
  isRevenue = false;
  importOption: string;
  private _inputValue: string;
  inputJsonObj:ProjectTransfer[]= [];
  @Input() set inputValue(value: string) {
    if (this._inputValue !== value) {
      this._inputValue = value;
      try {
        this.inputJsonObj = JSON.parse(value);
        this.pCount = this.inputJsonObj.length;
        this.pTime = this.inputJsonObj.length * 0.2;
        this._inputValue = JSON.stringify(this.inputJsonObj, undefined, '\t');
      } catch (e) {
        if (e instanceof syntaxError) {
        } else {
        }
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
      this.inputJsonObj === undefined ||
      this.inputJsonObj.length === 0 ||
      this.inputJsonObj === null
    ) {
      this.message.warning('还没有内容呢！');
      this.loading = false;
      this.disabled = false;
      return;
    }
    if(!this.validateRegister()){
      
      this.message.error('无法继续');
    };
    console.log(format(this.revenueMonth,'YYYY-MM'));
    zip(
      this.http.post('person/SimpleCreateByProjects', this.inputJsonObj),
      this.http.post('home/Service/addandupdatecollection', this.inputJsonObj),
      this.http.post('home/Client/addandupdatecollection', this.inputJsonObj),
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
        switch (this.importOption) {
          case 'cover':
            this.coverImport(true);
            break;
          case 'ignore':
            this.coverImport(false);
            break;
          case 'only':
            this.onlyImport();
            break;
        }
        this.loading = false;
        this.disabled = false;
      },
    );
  }

  onlyImport() {
    
    if(this.validateRegister()){
      this.inputJsonObj.forEach(item=>{
        item.RevenueMonth=format(this.revenueMonth,'YYYY-MM');
       });
        this.http.post('home/revenueregisterbatch',this.inputJsonObj)
        .subscribe(
          res=>{console.log(res);}
        )
    }else{
      this.message.error('无法继续');
    };
   
  }
  validateRegister():boolean{
    if(!this.revenueMonth){
      this.message.error('月份未输入！');
      return false;
    }
    this.inputJsonObj.forEach(item=>{
      if(item.CompleteDate===null){
        this.message.error('有项目还未完成！');
        return false;
      }
      if(item.InvoicedFee===0){
        this.message.error('有项目还没分钱');
        return false;
      }
      return true;
    });
    return true;
  }
  coverImport(isCovered: boolean) {
    let url = '';
    if (isCovered) {
      url = 'home/Projects/addandupdatecollection';
    } else {
      url = 'home/Projects/addcollection';
    }
    this.http.post(url, this.inputJsonObj).subscribe(
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
  }
}
