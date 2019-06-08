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
  expandForm = false;
  inputJobno = '';
  record: any;

  constructor(
    public msg: NzMessageService,
    public http: _HttpClient,
    private drawer: DrawerHelper,
    public cache: CacheService,
  ) {}
  // forms
  users = [];
  engineers = [];
  engineeringCSs = [];
  sales = [];

  ngOnInit(): void {
    if (!this.cache.getNone('dbstatus')) {
      this.http.get(`home/dbstatus`).subscribe(res => (this.record = res));
    } else {
      this.cache.get<any>('dbstatus').subscribe(res => {
        res.forEach(element => {
          this.record = res;
        });
      });
    }
  }

  simpleGetData() {}

  AdvancedGetData() {}

  stChange(e: STChange) {}
  filterData() {}
  // search(): void {
  //   const filterFunc = (item: ProjectTransfer) => {
  //     return item.ProjectNo.indexOf(this.searchValue) !== -1;
  //   };
  //   const data = this.ptsShow.filter((item: ProjectTransfer) =>
  //     filterFunc(item),
  //   );
  //   this.ptsShow = data.sort((a, b) =>
  //     this.sortValue === 'ascend'
  //       ? a[this.sortName] > b[this.sortName]
  //         ? 1
  //         : -1
  //       : b[this.sortName] > a[this.sortName]
  //       ? 1
  //       : -1,
  //   );
  // }
  // reset() {
  //   this.searchValue = '';
  //   this.search();
  // }
  // sort(sort: { key: string; value: string }): void {
  //   this.sortName = sort.key;
  //   this.sortValue = sort.value;
  //   this.search();
  // }

  getData() {
    // if (this.expandForm) {
    //   console.log(this.expandForm);
    //   this.loading = true;
    //   this.checkloading = true;
    //   this.params.OpenDateFrom =
    //     this.OpenDateFrom.toString() !== 'Invalid Date'
    //       ? this.OpenDateFrom.toLocaleDateString()
    //       : '';
    //   this.params.OpenDateTo =
    //     this.OpenDateTo.toString() !== 'Invalid Date'
    //       ? this.OpenDateTo.toLocaleDateString()
    //       : '';
    //   this.params.CompleteDateFrom =
    //     this.CompleteDateFrom.toString() !== 'Invalid Date'
    //       ? this.CompleteDateFrom.toLocaleDateString()
    //       : '';
    //   this.params.CompleteDateTo =
    //     this.CompleteDateTo.toString() !== 'Invalid Date'
    //       ? this.CompleteDateTo.toLocaleDateString()
    //       : '';
    //   switch (this.IsFinished) {
    //     case 0:
    //       this.params.IsFinished = true;
    //       break;
    //     case 1:
    //       this.params.IsFinished = false;
    //       break;
    //     case 2:
    //       this.params.IsFinished = '';
    //   }
    //   console.log(this.params);
    //   this.http
    //     .get<ProjectTransfer[]>('home/ProjectsbyFilter', this.params, {
    //       observe: 'response',
    //       responseType: 'json',
    //     })
    //     .subscribe(
    //       res => {
    //         this.ptsShow = [...res.body];
    //         this.totalCount = this.ptsShow.length;
    //       },
    //       err => {
    //         this.msgSrv.error('获取数据失败！');
    //         this.loading = false;
    //         this.checkloading = false;
    //       },
    //       () => {
    //         this.msgSrv.success('获取数据成功');
    //         this.loading = false;
    //         this.checkloading = false;
    //       },
    //     );
    // } else {
    //   if (this.inputJobno.length < 9) {
    //     this.msgSrv.warning('输入job no 不符合规则！');
    //     return;
    //   }
    //   console.log(this.inputJobno);
    //   this.http.get(`home/ProjectByProjectNo/${this.inputJobno}`).subscribe(
    //     res => {
    //       console.log(res);
    //       this.ptsShow = [res];
    //     },
    //     err => this.msgSrv.error('数据获取失败！'),
    //     () => this.msgSrv.success('数据获取成功！'),
    //   );
    // }
  }
  reset() {}
}
