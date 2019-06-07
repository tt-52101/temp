
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SyneltsUser } from 'app/services/biz/SyneltsUser';
import { NzMessageService } from 'ng-zorro-antd';
import { SFButton, SFSchema } from '@delon/form';
import { STColumn, STChange, STComponent } from '@delon/abc';
import { SettingTeamsetEditStaffComponent } from '../edit/staff/staff.component';
import { SyneltsRole } from 'app/services/biz/SyneltsRole';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-setting-teamset-members',
  templateUrl: './members.component.html',
})
export class SettingTeamsetMembersComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private fb:FormBuilder,
    private modal:ModalHelper
  ) {}
  loading = false;
  users = [];
  @ViewChild('st') st:STComponent;
  form:FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  
  staffs: SyneltsUser[]=[];
  staffColumns: STColumn[] = [
    {
      title:'No',
      index:'Id',
      type:'checkbox',
    },
    {
      title: 'Name',
      index: 'Name',
      sort: {
        compare: (a: SyneltsUser, b: SyneltsUser) => (a.Name > b.Name ? 1 : -1),
      },
    },
    {
      title: 'Roles',
      index: 'SyneltsRoles',
      sort: {
        compare: (a: SyneltsUser, b: SyneltsUser) =>
          a.SyneltsRoles > b.SyneltsRoles ? 1 : -1,
      },
    },
    {
      title: 'Job Status',
      index: 'IsCurrentOnJob',
      type: 'yn',
      yn: {
        yes: '在岗',
        no: '不在岗',
        mode: 'text',
      },

      sort: {
        compare: (a: SyneltsUser, b: SyneltsUser) =>
          a.IsCurrentOnJob > b.IsCurrentOnJob ? 1 : -1,
      },
    },
    {
      title: 'Operation',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingTeamsetEditStaffComponent,
            paramsName: 'i',
            size: 'md',
          },
          click: (i, m, c) => {
            this._submitForm();
          },
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            this.http.delete(`home/project/${i.Id}`).subscribe(
              res => {
                this.msg.success(res);
              },
              err => {},
              () => {
                this.msg.success('Success');
                c.removeRow(i);
              },
            );
          },
        },
      ],
    },
  ];
  ngOnInit() {
    const children: Array<{ label: string; value: string }> = [
      {label:'工程师',value:'Engineer'},
      {label:'工程助理',value:'EngineeringCS'},
      {label:'销售',value:'Sales'},
      {label:'销售助理',value:'SalesCS'},
    ];
    this.form = this.fb.group({
      Name:[''],
      SyneltsRole:[''],
      IsCurrentOnJob:[''],
    });
    this.listOfOption = children;
    this.http.get('person/userall').subscribe(
      (res) => {
        const data=this.handlePersonData(res);
        this.staffs=data;
      },
      err => {},
      () => {
        console.log(this.staffs);
        this.loading = false;
      },
    );
  }

  load() {}

  _submitForm() {
    console.log(this.form.value);
    this.loading = true;
    this.http.get('person/userbyfilter',this.form.value).subscribe(
      (res) => {
        this.staffs=this.handlePersonData(res.Items);
      },
      err => {},
      () => {
        console.log(this.staffs);
        this.loading = false;
      },
    );
   
  }
  
  private handlePersonData(res) {
    res.forEach(i => {
      const st = i.SyneltsRole.toString().split('');
      const roles = [];
      if (st.length > 1) {
        st.forEach(element => {
          const ind = parseInt(element, 10);
          const role = SyneltsRole[ind];
          roles.push(role);
        });
      }
      else {
        const ind = parseInt(st[0], 10);
        const role = SyneltsRole[ind];
        roles.push(role);
      }
      i.SyneltsRoles = roles;
      
    });
    return res;
  }
  create(){
    this.modal.create(SettingTeamsetEditStaffComponent,{},{size:'md'})
    .subscribe(()=>{
      this.st.load();
    });
  }
}
