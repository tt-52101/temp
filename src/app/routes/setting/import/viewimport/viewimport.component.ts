import { filter } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NzModalRef, NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { _HttpClient, DrawerHelper, ModalHelper } from '@delon/theme';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from, of } from 'rxjs';
import { CacheService } from '@delon/cache';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { STColumn, STChange, STComponent } from '@delon/abc';
import { SFButton, SFSchema, SFComponent } from '@delon/form';
import { SettingImportEditRecordsComponent } from '../edit/records/records.component';
import { ReloadOutline } from '@ant-design/icons-angular/icons/public_api';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
  record: any = {};

  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    public cache: CacheService,
  ) {}
  // forms
  timeJobData: any[] = [];
  timeJobCountData: any[] = [];

  ngOnInit(): void {
    this.http.get('home/dbstatus').subscribe(res => {
      this.record = res;
      console.log(res);
      console.log(res.Daily);
      const temp1 = this.caculateTimChart(res,'amount');
      const temp2=this.caculateTimChart(res,'count')
      this.timeJobData = temp1;
      this.timeJobCountData=temp2;
    });
  }

  private caculateTimChart(res: any,type:string) {
    const theYear = new Date().getFullYear();
    const temp1 = [];
    const temp2 = [];
    const beginDay = Date.parse(res.OpenStartDate);
    const endDay = new Date().getTime();
    const dayCount = Math.abs(endDay - beginDay) / 1000 / 60 / 60 / 24;
    if(type==='amount'){
      res.Daily.forEach(element => {
        temp1.push({
          TheDay: Date.parse(element.TheDay),
          JobOpenAmount: element.JobOpenAmount,
          JobCompleteAmount: element.JobCompleteAmount,
        });
      });
      for (let i = 0; i < dayCount; i += 1) {
        let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
        let ss = temp1.find(n => n.TheDay === theDay.getTime());
        if (ss) {
          temp2.push({
            x: ss.TheDay,
            y1: ss.JobOpenAmount,
            y2: ss.JobCompleteAmount,
          });
        }
        else {
          temp2.push({
            x: theDay.getTime(),
            y1: 0,
            y2: 0,
          });
        }
      }
      console.log(temp2);
    return temp2;
    }else{
      res.Daily.forEach(element => {
        temp1.push({
          TheDay: Date.parse(element.TheDay),
          JobOpenCount: element.JobOpenCount,
          JobCompleteCount: element.JobCompleteCount,
        });
      });
      for (let i = 0; i < dayCount; i += 1) {
        let theDay = new Date(beginDay + 1000 * 60 * 60 * 24 * i);
        let ss = temp1.find(n => n.TheDay === theDay.getTime());
        if (ss) {
          temp2.push({
            x: ss.TheDay,
            y1: ss.JobOpenCount,
            y2: ss.JobCompleteCount,
          });
        }
        else {
          temp2.push({
            x: theDay.getTime(),
            y1: 0,
            y2: 0,
          });
        }
      }
      console.log(temp2);
    return temp2;
    }
    
    
    
    
  }

  stChange(e: STChange) {}

  reset() {}
}
