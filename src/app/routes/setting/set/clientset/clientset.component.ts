import { STColumn, STChange,STData, STComponent } from '@delon/abc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingSetEditClienteditComponent } from '../edit/clientedit/clientedit.component';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-setting-set-clientset',
  templateUrl: './clientset.component.html',
})
export class SettingSetClientsetComponent implements OnInit {
  constructor(private http: _HttpClient,
    private msg:NzMessageService,
    private modal:ModalHelper) {}
    @ViewChild('st')
  private readonly st: STComponent;
  expandForm = false;
  loading = false;
  checkloading = false;
  inputclientName='';
  selectStatus=0;
  params={
    ClientType:'',
    EntryDate:new Date(2006,2,1).toLocaleDateString(),
    Name:''
  };
  status = [{ index: 0, text: '未设置' }, { index: 1, text: '已设置' }];
  
  clientTypes = [
    { index: 0, text: '普通客户',value:'Normal' },
    { index: 1, text: 'VIP',value:'VIP' },
    { index: 2, text: 'Agent',value:'Agent' },
  ];
  startDate:Date=new Date();
  clients=[];
  selectClients=[];
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
            size: 'lg',
            paramsName: 'i',
          },
          click: 'load',
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            // this.http.delete(`${this.url}`, { id: i.id }).subscribe(() => {
            //   this.msg.success('Success');
            //   c.removeRow(i);
            // });
          },
        },
      ],
    },
    
  ];
  ngOnInit() {}
  change(e:STChange){
    
     this.selectClients=e.checkbox;
     console.log(this.selectClients)
  }
  getData(){
    this.checkloading=true;
    this.loading=true;
    if(this.expandForm){
      if(this.selectStatus=0){
        this.params.ClientType='';
      }
      this.params.EntryDate=this.startDate.toLocaleDateString();
      this.http.get('client/collectionByFilter',this.params).subscribe(res=>{
        this.clients=[...res];
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
      });
    }else{
      this.params.Name=this.inputclientName;
      this.params.ClientType='';
      this.params.EntryDate='';
      console.log(this.params);
      this.http.get('client/collectionByFilter',this.params).subscribe(
        res=>{
          
          this.clients=res;
          console.log(this.clients);
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
  
  setNormal(){
    this.selectClients.map(c=>c.ClientType='Normal');
    console.log(this.selectClients);
  }
  setVIP(){

  }
  setAgent(){

  }
  createClient(){
    this.modal.createStatic(SettingSetEditClienteditComponent,{},{size:'lg'})
    .subscribe(
      ()=>this.st.reload()
    );
  }
}
