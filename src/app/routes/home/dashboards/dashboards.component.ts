import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-routes-home-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.less'],
})
export class RoutesHomeDashboardsComponent implements OnInit {
  q: any = {
    status: 'all',
  };
  loading = false;
  data: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.get('/api/list', { count: 5 }).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  openEdit(record: any = {}) {
    // this.modal
    //   .create(ProBasicListEditComponent, { record }, { size: 'md' })
    //   .subscribe(res => {
    //     if (record.id) {
    //       record = Object.assign(record, { id: 'mock_id', percent: 0 }, res);
    //     } else {
    //       this.data.splice(0, 0, res);
    //       this.data = [...this.data];
    //     }
    //     this.cdr.detectChanges();
    //   });
  }
}
