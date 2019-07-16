import { RoutesDashboardsTaskComponent } from './task/task.component';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from } from 'rxjs';

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DocumentsServiceService } from 'app/services/biz/documents-service.service';
import { ProgressType } from 'app/services/biz/ProgressType';
import { SettingImportEditProjectComponent } from '../setting/import/edit/project/project.component';
import { RoutesDashboardsProgressComponent } from './progress/progress.component';

@Component({
  selector: 'app-routes-home-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesHomeDashboardsComponent implements OnInit {
  list: ProjectTransfer[] = [];
  showList: ProjectTransfer[] = [];
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private cd: ChangeDetectorRef,
    private modal: ModalHelper,
  ) {}
  idx1=0;
  idx2 = 0;

  @Input() set sortType(value: string) {
    switch (value) {
      case 'client':
        {
          this.showList = this.showList.sort((a, b) =>
            a.ClientName > b.ClientName ? 1 : -1,
          );
        }
        break;
      case 'service':
        {
          this.showList = this.showList.sort((a, b) =>
            a.ServiceNames > b.ServiceNames ? 1 : -1,
          );
        }
        break;
      case 'progress':
        {
          this.showList = this.showList.sort((a, b) =>
            a.ManualProgress > b.ManualProgress ? 1 : -1,
          );
        }
        break;
    }
  }
  synName = '';
  documents: any[] = [];
  ngOnInit() {
    this.http.get('assets/tmp/documents.json').subscribe(
      res => (this.documents = res),
      err => {},
      () => {
        const user = localStorage.getItem('user');
        const userO = JSON.parse(user);
        console.log(userO);
        this.synName = userO.SyneltsName;
        console.log(this.synName);
        this.http
          .get('home/ProjectsByEngName', {
            synetlsname: this.synName,
            isInclude: 'true',
            isFinish: 'false',
          })
          .subscribe(res => {
            this.showList = res.Items;
            // const totalLoad=this.documents.reduce((arr,cur)=>arr+cur.workload,0);
            this.showList.forEach(item => {
              if (item.FinishedDocuments) {
                const finishDocs = item.FinishedDocuments.split('_');
                const setDocs = item.SetDocuments.split('_');
                const actual = this.documents
                  .filter(f => finishDocs.includes(f.name))
                  .reduce((acc, cur) => acc + cur.workload, 0);
                const total = this.documents
                  .filter(f => setDocs.includes(f.name))
                  .reduce((acc, cur) => acc + cur.workload, 0);
                item.ProgressPercent = (actual * 100) / total;
              }
              const ms =
                Date.parse(item.OpenDate.toString()) +
                item.ActualProjectWorkingDays * 1000 * 24 * 60 * 60;
              console.log(ms);
              // const ms=item.OpenDate.getTime()+item.ActualProjectWorkingDays*1000*24*60*60;
              item.TargetDate = new Date(ms);
            });
            this.list=this.showList
            this.selectedIndexChange2(this.idx2);
            console.log(res.Items);

            this.cd.detectChanges();
          });
      },
    );

    // this.http.get('/project').subscribe((res: any) => {
    //   this.list = res;
    //   this.cd.detectChanges();
    // });
  }
  selectedIndexChange1(data: number) {

  }
  setupNewTask(idx:number){
    if(idx===0){
      this.modal.createStatic(RoutesDashboardsTaskComponent,{},{size:'md'}).subscribe(
        res=>console.log(res)
      );
    }
  }
  selectedIndexChange2(data: number) {
    const typesHandling = [
      'Construction Check',
      'Testing',
      'Reporting',
      'Reviewing',
      'Applying For Certificate',
    ];
    const typesPending = [
      'Waiting For Documents',
      'Waiting For Confirmation',
      'Waiting For Modification',
    ];
    switch (data) {
      case 0:
        this.showList = this.list.filter(p =>
          typesHandling.includes(p.ManualProgress),
        );
        break;
      case 1:
        this.showList = this.list.filter(l =>
          typesPending.includes(l.ManualProgress),
        );
        break;
      case 2:
        this.showList = this.list;
        break;
    }
  }
  setProgressType(i: ProjectTransfer) {
    this.modal
      .createStatic(RoutesDashboardsProgressComponent, { i }, { size: 'md' })
      .subscribe(res => {
        if (res) {
          this.list.map(item => {
            return item.ProjectNo === res.ProjectNo ? res : item;
          });
          this.selectedIndexChange2(this.idx2);
        }
      });
  }
}
