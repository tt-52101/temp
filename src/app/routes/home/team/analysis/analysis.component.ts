import { ProjectTransfer } from './../../../../services/biz/projecttransfer';
import { Validators } from '@angular/forms';
import { SFSchema, SFButton, SFComponent } from '@delon/form';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, Layout } from '@delon/theme';
import { format } from 'date-fns';

@Component({
  selector: 'app-home-team-analysis',
  templateUrl: './analysis.component.html',
})
export class HomeTeamAnalysisComponent implements OnInit {

  constructor(private http: _HttpClient) { }
  @ViewChild('sf') sf:SFComponent
  needRevenue=false;
  needJobin=false;
  dataSource:ProjectTransfer[]=[];
  jobAmountPieBiz=[];
  totalAmount:string;
  jobCountPieDBiz=[];
  totalCount:string;
  
  ngOnInit() {
   
   }
   sfBtn:SFButton={
     submit:'计算',
     reset:'重置',
     render: { grid: { span: 24 }, class: 'text-right mb0', spanLabelFixed: 0 },
   }
   
  periodSchema:SFSchema={
    properties:{
      FromMonth:{
        type:'string',
        title:'起始月份',
        format:'month',
        ui:{
          span:4
        }
      },
      ToMonth:{
        type:'string',
        title:'截止月份',
        format:'month',
        ui:{
          span:4
        }
      },
      Revenue:{
        type:'string',
        title:'Revenue',
        ui:{
          widget:'checkbox',
          span:4
        }
      },
      JobIn:{
        type:'string',
        title:'Job In',
        ui:{
          widget:'checkbox',
          span:4
        }
      },
    },
    ui:{
      grid: {xs:12, md: 12, lg: 6 },
      spanLabelFixed: 120,
    }
    
    
  }
  submit(data:any){
    console.log(data);
    const from=format(this.sf.value.FromMonth,'YYYYMM');
    const to=format(this.sf.value.ToMonth,'YYYYMM');
    // 获取选择时间间隔的所有register案子，使用revenueMonth属性
    this.http.get('home/projectsbyfilter',{FromRevenueMonth:from,ToRevenueMonth:to})
      .subscribe(
        res=>{
          this.dataSource=res.Items;
          console.log(res.Items);
        },
        err=>{},
        ()=>{
          
        }
        );
  }

}
