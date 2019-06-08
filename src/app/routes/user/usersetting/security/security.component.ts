import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-usersetting-security',
  templateUrl: './security.component.html',
})
export class UserUsersettingSecurityComponent implements OnInit {
  constructor(public msg: NzMessageService) {}

  ngOnInit() {}
}
