import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { UserUsersettingSecurityPwdEditComponent } from './pwd-edit/pwd-edit.component';

@Component({
  selector: 'app-user-usersetting-security',
  templateUrl: './security.component.html',
})
export class UserUsersettingSecurityComponent implements OnInit {
  constructor(public msg: NzMessageService,private modal: ModalHelper) {}
  user:any;
  ngOnInit() {

  }
  PasswordModal(){
    console.log('www');
    this.modal.createStatic(UserUsersettingSecurityPwdEditComponent,{},{size:'md'})
    .subscribe(res=>{});
  }
}
