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
import { SettingImportEditProjectComponent } from '../edit/project/project.component';
import { SettingImportEditRecordsComponent } from '../edit/records/records.component';
import { ReloadOutline } from '@ant-design/icons-angular/icons/public_api';

@Component({
  selector: 'app-setting-import-viewimport',
  templateUrl: './viewimport.component.html',
})
export class SettingImportViewimportComponent implements OnInit {
 
  record: any={};

  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    public cache: CacheService,
  ) {}
  // forms
  

  ngOnInit(): void {
    this.http.get('home/dbstatus').subscribe(res => (this.record = res));
  }

  
  stChange(e: STChange) {}
 
  reset() {}
}
