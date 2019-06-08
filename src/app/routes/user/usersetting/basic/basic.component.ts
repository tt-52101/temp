import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { zip } from 'rxjs';

@Component({
  selector: 'app-user-usersetting-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserUsersettingBasicComponent implements OnInit {
  avatar = '';
  userLoading = true;
  user: any;

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    zip(
      this.http.get('/user/current'),
    ).subscribe(([user, province]: any) => {
      this.userLoading = false;
      this.user = user;
     
      this.cdr.detectChanges();
    });
  }

 

  save() {
    this.msg.success(JSON.stringify(this.user));
    return false;
  }
}
