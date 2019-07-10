import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { from } from 'rxjs';

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { DocumentsServiceService } from 'app/services/biz/documents-service.service';

@Component({
  selector: 'app-routes-home-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesHomeDashboardsComponent implements OnInit {
  list: ProjectTransfer[] = [];
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private cd: ChangeDetectorRef,
  ) {}
  synName='';
  documents:any[]=[];
  ngOnInit() {
    this.http.get('assets/tmp/documents.json').subscribe(
      res=>this.documents=res,
      err=>{},
      ()=>{
        const user = localStorage.getItem('user');
    const userO = JSON.parse(user);
    console.log(userO);
    this.synName = userO.SyneltsName;
    console.log(this.synName);
     this.http
      .get('home/ProjectsByEngName', { 
          synetlsname: this.synName,
          isInclude:'true',
          isFinish:'false' 
          })
      .subscribe( res=>{
        this.list=res.Items;
        const totalLoad=this.documents.reduce((arr,cur)=>arr+cur.workload,0);
        this.list.forEach(item=>{
          const arr=item.Documents.split('_');
          const actual=this.documents.filter(f=>arr.includes(f.name))
            .reduce((acc,cur)=>acc+cur.workload,0);
            item.ProgressPercent=actual*100/totalLoad;
        })
        console.log(res.Items);
        
        this.cd.detectChanges();
      });
      }
    );
    
    // this.http.get('/project').subscribe((res: any) => {
    //   this.list = res;
    //   this.cd.detectChanges();
    // }); 
  }

  del(i: any, idx: number) {
    this.http.delete('/project', { id: i.id }).subscribe(() => {
      this.msg.success('Success');
      this.list.splice(idx, 1);
      this.cd.detectChanges();
    });
  }
}
