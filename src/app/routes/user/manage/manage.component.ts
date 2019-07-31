import { CacheService } from '@delon/cache';
import { SFSchema, SFComponent } from '@delon/form';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, DrawerHelper, ModalHelper } from '@delon/theme';
import { STColumn, STChange, STData, STComponent } from '@delon/abc';
import { UserManageUserEditComponent } from './user-edit/user-edit.component';
import { NzMessageService } from 'ng-zorro-antd';
import { UserRegisterComponent } from 'app/routes/passport/register/register.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './manage.component.html',
})
export class UserManageComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private drawer: DrawerHelper,
    public cache: CacheService,
  ) {}

  ngOnInit() {
    this.loadAllUsers();
    
  }

  
  data: any[] = [];
  selectRows: STData[] = [];
  @ViewChild('st') st: STComponent;
  uColumns: STColumn[] = [
    {
      title: '序号',
      index: 'Id',
      type: 'checkbox',
      width: '50px',
    },
    {
      title: 'User Name',
      index: 'name',
      width: '120px',
      sort: {
        compare: (a, b) => (a.UserName > b.UserName ? 1 : -1),
      },
    },
    {
      title: 'Synetls Name',
      index: 'SyneltsName',
      sort: {
        compare: (a, b) => (a.SyneltsName > b.SyneltsName ? 1 : -1),
      },
    },
    {
      title: 'Roles',
      index: 'Roles',
      sort: {
        compare: (a, b) => (a.Roles > b.Roles ? 1 : -1),
      },
    },
    {
      title: 'Create On',
      index: 'CreatedOn',
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      sort: {
        compare: (a, b) => (a.CreatedOn > b.CreatedOn ? 1 : -1),
      },
    },
    {
      title: 'Operation',
      fixed: 'right',
      width: '120px',
      buttons: [
        {
          icon: 'edit',
          type: 'drawer',
          drawer: {
            component: UserManageUserEditComponent,
            paramsName: 'i',
            params: (record: any) => record,
            size: 'md',
          },
          click: (i, m, c) => {
            this.loadAllUsers();
          },
        },

        {
          icon: 'delete',
          type: 'del',
          acl: ['God', 'Super Admin'],
          click: (i, m, c) => {
            this.http.delete(`auth/user/${i.Id}`).subscribe(
              res => {
                if (res.Message === 'OK') {
                  this.msg.success('Success');
                } else {
                  this.msg.error(`出了问题：${res.Message}`);
                }
              },
              err => {},
              () => {
                c.removeRow(i);
              },
            );
          },
        },
      ],
    },
  ];

  stChange(e: STChange) {
    // console.log(e);
    if (e.checkbox) {
      this.selectRows = e.checkbox;
      console.log(this.selectRows);
    }
    if (e.type === 'ps') {
      this.st.reload();
      console.log('page change');
    }
  }
  resetPwd() {
    if (this.selectRows.length > 0) {
      this.selectRows.forEach(item => {
        this.http
          .post('auth/resetpwd', { UserName: item.name })
          .subscribe(
            res => console.log(res),
            err => {},
            () => this.loadAllUsers(),
          );
      });
    } else {
      this.msg.error('没有选择任何用户');
    }
  }
  createUser() {
    this.drawer
      .static('New user', UserManageUserEditComponent, {}, { size: 'md' })
      .subscribe(res => this.loadAllUsers());
  }
  private loadAllUsers() {
    this.http.get('auth/users').subscribe(res => {
      this.data = res;
    });
  }
}
