import { STColumn } from '@delon/abc';
import { Component, OnInit } from '@angular/core';
import {
  NzModalRef,
  NzMessageService,
  NzDrawerRef,
  isTemplateRef,
} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { Title } from '@angular/platform-browser';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';

@Component({
  selector: 'app-home-personel-categorize',
  templateUrl: './categorize.component.html',
})
export class HomePersonelCategorizeComponent implements OnInit {
  i: ProjectTransfer[];
  serviceData: ServiceData[] = [];
  pieDataCount: any[] = [];
  pieDataAmount: any[] = [];
  columns: STColumn[] = [
    {
      title: 'Service Name',
      index: 'Name',
    },
    {
      title: 'Quantity',
      index: 'Count',
    },
    {
      title: 'Amount',
      index: 'Amount',
    },
  ];
  totalCount: string;
  totalAmount: string;

  constructor(
    private drawer: NzDrawerRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}
  formatAmount(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }
  formatCount(val: number) {
    return `${val}个`;
  }
  ngOnInit(): void {
    console.log(this.i);
    let services: ServiceData[] = [
      
    ];
    let p1: PieData[] = [
      { x: 'Safety', y: 0 },
      { x: 'EE', y: 0 },
      { x: 'Chemical', y: 0 },
      { x: 'Unknown', y: 0 },
    ];
    let p2: PieData[] = [
      { x: 'Safety', y: 0 },
      { x: 'EE', y: 0 },
      { x: 'Chemical', y: 0 },
      { x: 'Unknown', y: 0 },
    ];
    this.i.forEach(element => {
      let snames='';
      element.ServiceNames.forEach(item=>snames+=item);

      let find = services.filter(p => p.Name === snames);
      console.log(find.length);
      
      if (find.length !== 0) {
        find[0].Count += 1;
        find[0].Amount += element.QuotedFee;
      } else {
        services.push({
          Name: snames,
          Count: 1,
          Amount: element.QuotedFee,
        });
      }

      p1.filter(p => p.x === element.BType)[0].y += 1;

      p2.filter(p => p.x === element.BType)[0].y += element.QuotedFee;
    });
    this.totalAmount = `&yen ${this.i
      .reduce((acc, cur) => acc + cur.QuotedFee, 0)
      .toFixed(2)}`;
    this.totalCount = `${this.i.length}个`;
    this.serviceData = services.sort((a, b) =>
    a.Amount < b.Amount ? 1 : -1,);
    this.pieDataCount = p1;
    this.pieDataAmount = p2;
  }

  close() {
    this.drawer.close();
  }
}
export interface ServiceData {
  Name: string;
  Count: number;
  Amount: number;
}
export interface PieData {
  x: string;
  y: number;
}
