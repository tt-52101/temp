import { from } from 'rxjs';
import { WDCalulatorService } from './../../services/common/wdcalulator.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-routes-home-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesHomeDashboardsComponent implements OnInit {
  list: any[] = [];
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private cd: ChangeDetectorRef,
  ) {}
synName='';
  ngOnInit() {
    const user = localStorage.getItem('user');
    const userO = JSON.parse(user);
    console.log(userO);
    this.synName = userO.SyneltsName;
     this.http
      .get('home/ProjectsByEngName', { 
          syneltsname: this.synName,
          isInclude:'true',
          isFinish:'false' 
          })
      .subscribe( res=>{
        this.list=res.Items;
        console.log(res.Items);
        
        this.cd.detectChanges();
      });
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
