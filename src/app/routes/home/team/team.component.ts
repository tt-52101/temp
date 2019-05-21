import { map, zip } from 'rxjs/operators';
import {
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';

@Component({
  selector: 'app-routes-home-team',
  templateUrl: './team.component.html',
})
export class RoutesHomeTeamComponent implements OnInit {
  constructor(private http: _HttpClient) {
    
    
   
  }
  params: any = {
    CurrentPage: 1,
    PageSize: 20,
    IsDeleted: false,
    IsIncludeAll: true,
    IsFinished: false,
    EngineerName: '',
    EngineeringCSName: '',
    AssistEngineerName: '',
    SalesCSName: '',
    SalesName: '',
    ServiceName: '',
    ClientName: '',
    OpenDateFrom: '',
    OpenDateTo: '',
    CompleteDateFrom: '',
    CompleteDateTo: '',
  };
  unfinishedJobs:ProjectTransfer[];
  totalQuantity = '12443';
  RevenueTitle = '';
  budgetTotal = 0;
  actualTotoal = 0;
  percentRevenue = 0;
  ProjectNos = 'Project Nos';
  loading = false;
  engineersList = [];
  finishedAmountMonth = 12342;
  finishedAmountYear = 120342;
  projectNoPieData = [
    {
      x: 'Safety',
      y: 4544,
    },
    {
      x: 'Energy Efficiency',
      y: 3321,
    },
    {
      x: 'Chemical',
      y: 3113,
    },
  ];
  totalTabs: any[] = [{ key: 'Revenue', show: true }, { key: 'Job in',show:false }];
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
  engineerTabs:any=[];
  ngOnInit() {
    
    this.http.get('biz/revenue').subscribe(
      res => {
        this.monthData = [];
        this.RevenueTitle = 'Revenue (' + res.unit + ')';
        this.budgetTotal = [...res.data].reduce(
          (acc, cur) => acc + cur.Budget,
          0,
        );
        this.actualTotoal = [...res.data].reduce(
          (acc, cur) => acc + cur.Actual,
          0,
        );
        this.percentRevenue = Math.floor(
          (this.actualTotoal * 100) / this.budgetTotal,
        );

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
      },
      err => {},
      () => {
        
      },
    );
    this.http.get('biz/engineers').subscribe(
      res=>this.engineersList=res,
      err=>{},
      ()=>{
        for (let i = 0; i < this.engineersList.length; i++) {
          this.engineerTabs.push({
            name: this.engineersList[i],
            content: ''
          });
        }
      }
    )
    // this.http.get<ProjectTransfer[]>('home/ProjectsbyFilter', this.params,
    // {observe:'response',responseType:'json'})
    // .subscribe(res => {
    //   this.unfinishedJobs=[...res.body];
    // },err=>{

    // },
    // ()=>{
    //   console.log(this.unfinishedJobs);
    // });
    
  }
  engIdx=0;
  selectChange(idx: number) {
    // if (this.totalTabs[idx].show !== true) {
    //   this.totalTabs[idx].show = true;
    //   this.cdr.detectChanges();
    // }
    console.log("change");
  }
  engChange(index:number){

  }
  format(val: number) {
    return `&yen ${val.toFixed(2)}`;
  }
}
