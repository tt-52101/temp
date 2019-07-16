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
import { syntaxError } from '@angular/compiler';

@Component({
  selector: 'app-setting-import-batchimport',
  templateUrl: './batchimport.component.html',
})
export class SettingImportBatchimportComponent implements OnInit, OnChanges {
  revenueYear=new Date().getFullYear().toString();
  revenueMonth=(new Date().getMonth()+1).toString();
  isRevenue=false;
  importOption='cover';
  private _inputValue: string;
  inputJsonObj=[];
  @Input() set inputValue(value: string) {
    if (this._inputValue !== value) {
      this._inputValue = value;
      try {
        this.inputJsonObj = JSON.parse(value);
        this.pCount = this.inputJsonObj.length;
        this.pTime = this.inputJsonObj.length * 0.2;
        this._inputValue=JSON.stringify(this.inputJsonObj,undefined,'\t');
        
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
      this.loading=false;
      this.disabled=false;
      return;
    }
    const urlcalls = [];
    urlcalls.push('person/SimpleCreateByProjects');
    urlcalls.push('home/Client/addandupdatecollection');
    urlcalls.push('home/Service/addandupdatecollection');

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
        switch(this.importOption){
          case 'cover':
            this.coverImport();
            break;
            case 'ignore':
              {}
              break;
              case 'only':
                {
                  
                  this.onlyImport();
                }
            
            break;
        }
      },
    );
  }
  
  optionChange(value:any){
    if(value===false){
      if(this.importOption==='only'){
        console.log('bingo');
        this.isRevenue=true;
      }else{
        this.isRevenue=false;
      }
    }
  }
  onlyImport(){
    console.log(this.revenueMonth);
    // if(this.isRevenue){
    //   this.inputJsonObj.forEach(element => {
    //     console.log(this.revenueMonth);
    //   });
    // }
    // this.http.post('home/revenueregister',this.inputJsonObj)
    // .subscribe(
    //   res=>{}
    // )
  }
  coverImport(){
    this.http
          .post('home/Projects/addandupdatecollection', this.inputJsonObj)
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
  }
}
