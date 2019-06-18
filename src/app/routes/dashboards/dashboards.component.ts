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
  timeChartData=[];
  render(el: ElementRef) {
    
  }
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private wdc:WDCalulatorService
  ) {}
  getRevenueJson() {
    return this.http.get('biz/revenue/2019');
  }
  ngOnInit() {
    this.getRevenueJson().subscribe(
      res => {
        [...res.data].forEach(element => {
          
          if (this.timeChartData.length !== 24) {
            this.timeChartData.push({
              month: element.Month,
              valueType: 'actual',
              value: element.Actual,
            });
            this.timeChartData.push({
              month: element.Month,
              valueType: 'budget',
              value: element.Budget,
            });
          }
        });
        this.cdr.detectChanges();
      },
      err => {},
      () => {
        this.cdr.detectChanges();
        console.log(this.timeChartData);
      },
    );
    
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
 resize(value){
   console.log(value);
 }
  
 
}
