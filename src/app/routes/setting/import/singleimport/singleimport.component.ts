import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { ProjectTransfer } from 'app/services/biz/projecttransfer';
import { NzMessageService } from 'ng-zorro-antd';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFButton, SFComponent } from '@delon/form';
import { XlsxService } from '@delon/abc';

@Component({
  selector: 'app-setting-import-singleimport',
  templateUrl: './singleimport.component.html',
})
export class SettingImportSingleimportComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private xls:XlsxService
  ) {}
  @ViewChild('sf1') sf1:SFComponent;
  @ViewChild('sf2') sf2:SFComponent;
  i: ProjectTransfer;
  users = [];
  engineers = [];
  engineeringCSs = [];
  sales = [];
  salesCSs = [];
  sheets=[];
  headers=[];
  allHeaders=[];
  fSchema:SFSchema={
    properties:{
      
      upload: {
        type: 'string',
        title: '文件',
        ui: {
          widget: 'upload',
          action: 'person/file',
          accept:'.xls,.xlsx',
          resReName: 'Records.fileName',
          type: 'drag',
          beforeUpload:(file)=>this.xlsPreHandle(file),
          hint:'点击打开文件，或拖曳文件到此打开文件'
        },
      },
    },
    };
    pSchema:SFSchema={
      properties:{
        sheet:{
          type:'string',
          title:'sheets',
          enum:this.sheets,
          
          ui:{
            widget:'select',
            change:(option)=>{
              console.log(option);
              const i=this.allHeaders.forEach(item=>{
                if(item&&item[option]){
                  return item;
                }
              })
              console.log(i);
            }
          },
        },
        headers: {
          type: 'string',
          title: '列名',
          enum: this.headers,
          ui: {
            widget: 'transfer',
            titles: ['excel中', '预备导入'],
          },
        },
      }
    }
    sfBtn:SFButton={
      submit:'分析',
    };
  ngOnInit(): void {
    this.i = new ProjectTransfer();
   
  }
  xlsPreHandle(file):boolean{
    let data:any;
    this.xls.import(file).then(res=>{
      data=res
      console.log(res);
      let c=Object.keys(data);
      c.forEach(item=>{
        this.sheets.push({label:item,value:item});
      });
      if(this.sheets){
        for(let i in data){
          let o={};
          
          o[i]=data[i][0];
          this.allHeaders.push(o);
        }
       
      }
      console.log(this.allHeaders);
      console.log(this.headers);
      if(this.sheets){
        return true;
      }else{
        return false;
      }
    });
    return true;

   
  }
  // pSchema: SFSchema = {
  //   properties: {
  //     ProjectNo: {
  //       type: 'string',
  //       title: '项目号',
  //     },
  //     QuotationNo: {
  //       type: 'string',
  //       title: '报价单号',
  //     },
  //     OpenDate: {
  //       type: 'string',
  //       title: '开案日期',
  //       format: 'date',
  //     },
  //     CompleteDate: {
  //       type: 'string',
  //       title: '完成日期',
  //       format: 'date',
  //     },
  //     EngineerName: {
  //       type: 'string',
  //       title: '工程师',
  //       enum: this.engineers,
  //       ui: { 
  //         widget: 'select', 
  //         allowClear: true,
  //         placeholder:'工程师',
          
  //        },
  //     },
  //     EngineeringCE: {
  //       type: 'string',
  //       title: '工程助理',
  //       enum: this.engineeringCSs,
  //       ui: { widget: 'select' },
  //     },
  //     Sales: {
  //       type: 'string',
  //       title: '工程师',
  //       enum: this.sales,
  //       ui: { widget: 'select' },
  //     },
  //     SalesCS: {
  //       type: 'string',
  //       title: '工程师',
  //       enum: this.salesCSs,
  //       ui: { widget: 'select' },
  //     },
  //     ClientName: {
  //       type: 'string',
  //       title: '客户名',
  //     },
  //     ServiceName: {
  //       type: 'string',
  //       title: '服务',
  //     },
  //     Product: {
  //       type: 'string',
  //       title: '产品',
  //     },
  //     Models: {
  //       type: 'string',
  //       title: '型号',
  //     },
  //     QuotedFee: {
  //       type: 'number',
  //       title: '报价金额',
  //     },
  //     InvoicedFee: {
  //       type: 'number',
  //       title: '开票金额',
  //     },
  //     CType: {
  //       type: 'string',
  //       title: '客户类型',
  //       ui: {
  //         widget: 'radio',
  //         asyncData: () =>
  //           of([
  //             { label: '普通客户', value: 'Normal' },
  //             { label: 'VIP客户', value: 'VIP' },
  //             { label: 'Agent客户', value: 'Agent' },
  //             { label: '未知', value: null },
  //           ]).pipe(delay(100)),
  //         change: console.log,
  //       },
  //       default: '',
  //     },
  //     BType: {
  //       type: 'string',
  //       title: '业务类型',
  //       ui: {
  //         widget: 'radio',
  //         asyncData: () =>
  //           of([
  //             { label: '安规', value: 'Safety' },
  //             { label: '能效', value: 'EE' },
  //             { label: '化学', value: 'Chemical' },
  //             { label: '未知', value: 'Unknown' },
  //           ]).pipe(delay(100)),
  //         change: console.log,
  //       },
  //       default: '',
  //     },
  //     RType: {
  //       type: 'string',
  //       title: '区域类型',
  //       ui: {
  //         widget: 'radio',
  //         asyncData: () =>
  //           of([
  //             { label: '欧洲', value: 'IEC' },
  //             { label: '北美', value: 'US' },
  //             { label: 'GMAP', value: 'GMAP' },
  //             { label: '未知', value: 'Unknown' },
  //           ]).pipe(delay(100)),
  //         change: console.log,
  //       },
  //       default: '',
  //     },
  //     ManualProgress: {
  //       type: 'string',
  //       title: '当前进度',
  //       ui: {
  //         widget: 'radio',
  //         asyncData: () =>
  //           of([
  //             { label: 'Testing', value: 'Testing' },
  //             { label: 'Reporting', value: 'Reporting' },
  //             {
  //               label: 'Waiting for Documents',
  //               value: 'Waiting for Documents',
  //             },
  //             { label: 'Apply Certificate', value: 'Apply Certificate' },
  //             { label: 'Waiting for FI', value: 'Waiting for FI' },
  //             {
  //               label: 'Waiting for Confirmation',
  //               value: 'Waiting for Client Confirmation',
  //             },
  //             {
  //               label: 'Waiting for Modification',
  //               value: 'Waiting for Client Modification',
  //             },
  //             { label: 'Apply Termination', value: 'Apply Termination' },
  //           ]).pipe(delay(100)),
  //         change: console.log,
  //       },
  //     },
  //     ActualWorkloadFactor: {
  //       type: 'number',
  //       title: '工作量系数',
  //       minimum: 0,
  //       maximum: 5,
  //     },
  //     TobeFinishFlag: {
  //       type: 'boolean',
  //       title: '是否本月完成',
  //       ui: {
  //         widget: 'radio',
  //         asyncData: () =>
  //           of([
  //             { label: '能', value: true },
  //             { label: '不能', value: false },
  //           ]).pipe(delay(100)),
  //       },
  //     },
  //   },
  // };

  save(value: any) {
    console.log(value);
    this.http.get('person/headerlist',{fileName:value.upload,})
    // this.http.put('home/project', value).subscribe(
    //   res => {
    //     if (res.Message === 'OK') {
    //       this.msg.success('保存成功');
    //     } else {
    //       this.msg.warning('出了点问题');
    //     }
    //   },
    //   err => {},
    //   () => {},
    // );
  }
}
