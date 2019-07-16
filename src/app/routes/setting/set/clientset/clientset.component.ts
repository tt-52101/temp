import { STColumn, STChange,STData, STComponent } from '@delon/abc';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingSetEditClienteditComponent } from '../edit/clientedit/clientedit.component';
import { isThisMinute } from 'date-fns';


@Component({
  selector: 'app-setting-set-clientset',
  templateUrl: './clientset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingSetClientsetComponent implements OnInit {
  constructor(private http: _HttpClient,
    private cdr:ChangeDetectorRef,
    private msg:NzMessageService,
    private modal:ModalHelper) {}
    @ViewChild('st')
  private readonly st: STComponent;
  expandForm = false;
  loading = false;
  checkloading = false;
  inputclientName='';
  selectStatus=0;
  selectClientType='Normal';
  params={
    ClientType:'Normal',
    EntryDate:new Date(2006,2,1).toLocaleDateString(),
    Name:'',
    SetAlready:false
  };
  status = [{ index: 0, text: '未设置',value:0 }, { index: 1, text: '已设置',value:1 }];
  
  clientTypes = [
    { index: 0, text: '普通客户',value:'Normal' },
    { index: 1, text: 'VIP',value:'VIP' },
    { index: 2, text: 'Agent',value:'Agent' },
  ];
  startDate:Date=new Date();
  clients=[];
  selectRows:STData[]=[];
  selectClients:STData[]=[];
  columns:STColumn[]=[
    {
      title:'序号',
      index:'Id',
      type:'checkbox'
    },
    {
      title: '客户',
      index: 'Name',
      sort:{
        compare:(a: any, b: any) => a.Name > b.Name?1:-1
      },
    },
    {
      title: '类型',
      index: 'ClientType',
      sort:{
        compare:(a: any, b: any) => a.ClientType > b.ClientType?1:-1
      },
    },
    {
      title: '',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingSetEditClienteditComponent,
            size: 'md',
            paramsName: 'i',
          },
          click: 'load',
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            this.http.delete(`client/singlebyid/${i.Id}`).subscribe(
              res=>{
                this.msg.success(res);
              },
              err=>{},
              () => {
              this.msg.success('Success');
              c.removeRow(i);
            });
          },
        },
      ],
    },
    
  ];
  ngOnInit() {}
  change(e:STChange){
    if(e.checkbox){
      this.selectClients=e.checkbox;
      this.cdr.detectChanges();
      console.log(this.selectClients)
    }
     
       }
  getData(){
    this.checkloading=true;
    this.loading=true;
    console.log(this.selectClientType);
    if(this.expandForm){
      if(this.selectStatus===0){
        this.params.Name='';
        this.params.ClientType='';
        this.params.SetAlready=false;
        this.params.EntryDate=this.startDate.toLocaleDateString();
      }else{
        this.params.Name='';
        this.params.ClientType=this.selectClientType;
        this.params.EntryDate=this.startDate.toLocaleDateString();
        this.params.SetAlready=true;
      }
      
      this.http.get('client/collectionByFilter',this.params).subscribe(res=>{
        if(res.Message==='OK'){
          this.clients=res.Items;
          this.cdr.detectChanges();
          this.msg.success(`成功搜索到${res.Items.length}个客户！`);
        }
        else{
          this.clients=[];
          this.cdr.detectChanges();
          this.msg.error(`搜索到0个客户！`);
        }
        
      },
      err=>{
        this.checkloading=false;
        this.loading=false;
        this.msg.error('服务器出错！');
      },
      ()=>{
        this.checkloading=false;
        this.loading=false;
        console.log(this.clients);
        this.msg.success('数据获取成功！');
      });
    }else{
      if(this.inputclientName===''){
        this.msg.warning('输入为空！');
        this.checkloading=false;
        this.loading=false;
        return;
      }else{
        this.selectClientType='';
        this.params.Name=this.inputclientName;
      this.params.ClientType='';
      this.params.EntryDate='';
      console.log(this.params);
      this.http.get('client/collectionByFilter',this.params).subscribe(
        res=>{
          if(res.Message==='OK'){
            this.clients=res.Items;
            console.log(this.clients);
            this.cdr.detectChanges();
            this.msg.success(`成功搜索到${res.Items.length}个客户`);
          }else{
            this.msg.error('出了点问题！');
          }
          
        },
        err=>{
          this.checkloading=false;
        this.loading=false;
        this.msg.error('服务器出错！');
        },
        ()=>{
          this.checkloading=false;
        this.loading=false;
        this.msg.success('数据获取成功！');
        }
      );
      }
      
    }
    
  }
  
  setNormal(){
    if(this.selectClients.length>0){
      this.selectClients.map(c=>c.ClientType='Normal');
      this.http.put('client/updatecollection',this.selectClients).subscribe(res=>{
        console.log(res);
        if(res.message==='OK'){
          this.msg.info('done');
        }
      },
      err=>{
        this.msg.error(JSON.stringify(err));
      },
      ()=>{
        this.getData();
        
      });
    }
  }
  setVIP(){
    if(this.selectClients.length>0){
      this.selectClients.map(c=>c.ClientType='VIP');
      this.http.put('client/updatecollection',this.selectClients).subscribe(res=>{
        console.log(res);
        if(res.message==='OK'){
          this.msg.info('done');
        }
      },
      err=>{
        this.msg.error(JSON.stringify(err));
      },
      ()=>{
        this.getData();
        
      });
  }
}
  setAgent(){
    if(this.selectClients.length>0){
      this.selectClients.map(c=>c.ClientType='Agent');
      this.http.put('client/updatecollection',this.selectClients).subscribe(res=>{
        console.log(res);
        if(res.message==='OK'){
          this.msg.info('done');
        }
      },
      err=>{
        this.msg.error(JSON.stringify(err));
      },
      ()=>{
        this.getData();
        
      });
  }
  }
  createClient(){
    this.modal.createStatic(SettingSetEditClienteditComponent,{},{size:'lg'})
    .subscribe(
      ()=>this.st.reload()
    );
  }
  reset(){
    this.inputclientName='';
    this.startDate=new Date();
    this.params.ClientType='';
    this.selectStatus=-1;
    this.selectClients=[];
  }
 
}
