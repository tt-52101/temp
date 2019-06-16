import { from } from 'rxjs';
import { WDCalulatorService } from './../../services/common/wdcalulator.service';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-routes-home-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoutesHomeDashboardsComponent implements OnInit {
  i:any={
    from:Date,
    to:Date
  };
  result:any;
  cacu(value:any){
    console.log(this.i.from);
    console.log(typeof(this.i.from))
    this.result=this.wdc.fromtoCount(this.i.from,this.i.to,false)
  }
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
    private wdc:WDCalulatorService
  ) {}

  ngOnInit() {
    this.getData();
    this.cdr.detectChanges();
  }
  RevenueTitle = '';
  monthData: any = [];
  jobinData: any = [];
  show=false;
  selectedIndexChange(idx:any){
    if(idx===1){
      this.show=true;
    }else{
      this.show=false;
    }
    
  }
  getData() {
    this.http.get('biz/revenue/2019').subscribe(
      res => {
        this.monthData = [];
        this.RevenueTitle = 'Revenue (' + res.unit + ')';

        [...res.data].forEach(element => {
          if (this.monthData.length !== 12) {
            this.monthData.push({
              x: element.Month,
              y: element.Actual,
            });
          }
          if (this.jobinData.length !== 12) {
            this.jobinData.push({
              x: element.Month,
              y: element.Budget,
            });
          }
          
        });
        this.cdr.detectChanges();
      },
      err => {},
      () => {
        console.log(this.monthData);
        console.log(this.jobinData);
        this.cdr.detectChanges();
      },
    );
  }
  render(el:ElementRef){
    const chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(this.jobinData);
    chart.scale('y', {
      tickInterval: 20
    });
    chart.interval().position('x*y');
    chart.render();
    this.cdr.detectChanges();
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
