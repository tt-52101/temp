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

  ngOnInit() {
    this.http.get('/project').subscribe((res: any) => {
      this.list = res;
      this.cd.detectChanges();
    });
  }

  del(i: any, idx: number) {
    this.http.delete('/project', { id: i.id }).subscribe(() => {
      this.msg.success('Success');
      this.list.splice(idx, 1);
      this.cd.detectChanges();
    });
  }
}
