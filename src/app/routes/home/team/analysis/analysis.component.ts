import { Validators } from '@angular/forms';
import { SFSchema, SFButton } from '@delon/form';
import { Component, OnInit } from '@angular/core';
import { _HttpClient, Layout } from '@delon/theme';

@Component({
  selector: 'app-home-team-analysis',
  templateUrl: './analysis.component.html',
})
export class HomeTeamAnalysisComponent implements OnInit {

  constructor(private http: _HttpClient) { }
  months2019:any[]=[];
  months2018:any[]=[];
  ngOnInit() {
    for(let i=1;i<=12;i++){
      this.months2019.push({
        label:i.toString(),value:i.toString(),parent:'2019',isLeaf:true
      });
      this.months2018.push({
        label:i.toString(),value:i.toString(),parent:'2018',isLeaf:true
      });
    }
    
    console.log(this.months2019);
   }
   sfBtn:SFButton={
     submit:'计算',
     reset:'重置',
   }
   
  periodSchema:SFSchema={
    properties:{
      From:{
        type:'string',
        title:'起始日期',
        enum:[
          {
            value:'2019',
            label:'2019',
            parent:0,
            children:this.months2019
          },
          {
            value:'2018',
            label:'2018',
            parent:0,
            children:this.months2018
          },
        ],
        default:['2019','1'],
        ui: 'cascader',
      },
      To:{
        type:'string',
        title:'截止日期',
        enum:[
          {
            value:'2019',
            label:'2019',
            parent:0,
            children:this.months2019
          },
          {
            value:'2018',
            label:'2018',
            parent:0,
            children:this.months2018
          },
        ],
        default:['2019','1'],
        ui: 'cascader',
        
      },
      word:{
        type:'string',
        title:'文字',
        ui:{
          validator:(data)=>{
            if(data==='0'){
              return [ { keyword: 'error', message: '不能等于0'} ];
            }
          }
        },
      }
    },
    
    
    
  }
  submit(data:any){
    console.log(data);
  }

}
