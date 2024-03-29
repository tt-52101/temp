import { Component, OnInit, ViewChild } from '@angular/core';
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
    private fb: FormBuilder,
    private modal: ModalHelper,
  ) {}
  loading = false;
  users = [];
  @ViewChild('st') st: STComponent;
  form: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfteam: Array<{ label: string; value: string }> = [];
  staffs: SyneltsUser[] = [];
  staffColumns: STColumn[] = [
    {
      title: 'No',
      index: 'Id',
      type: 'checkbox',
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
      title: '分组',
      index: 'SubTeam',
      sort: {
        compare: (a: SyneltsUser, b: SyneltsUser) =>
          a.SubTeam > b.SubTeam ? 1 : -1,
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
            // modalOptions:{
            //   nzOnCancel:(data)=>data.showConfirm(),
            // }
          },
          click: 'reload',
        },
        {
          icon: 'delete',
          type: 'del',
          click: (i, m, c) => {
            this.http.delete(`person/user/${i.Id}`).subscribe(
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
      { label: '工程师', value: 'Engineer' },
      { label: '工程助理', value: 'EngineeringCS' },
      { label: '销售', value: 'Sales' },
      { label: '销售助理', value: 'SalesCS' },
    ];
    const teams: Array<{ label: string; value: string }> = [
      { label: '安规', value: 'Safety' },
      { label: '能效', value: 'EE' },
      { label: '化学', value: 'Chemical' },
      { label: '助理', value: 'CS' },
    ];
    this.form = this.fb.group({
      Name: [''],
      SyneltsRole: [''],
      SubTeam: [''],
      IsCurrentOnJob: [''],
    });
    this.listOfOption = children;
    this.listOfteam=teams;
    this.http.get('person/userall').subscribe(
      res => {
        const data = this.handlePersonData(res);
        this.staffs = data;
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
    this.http.get('person/userbyfilter', this.form.value).subscribe(
      res => {
        this.staffs = this.handlePersonData(res.Items);
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
      } else {
        const ind = parseInt(st[0], 10);
        const role = SyneltsRole[ind];
        roles.push(role);
      }
      i.SyneltsRoles = roles;
    });
    return res;
  }
  create() {
    this.modal
      .create(SettingTeamsetEditStaffComponent, {}, { size: 'md' })
      .subscribe(res => console.log(res), err => {}, () => {});
  }
}
