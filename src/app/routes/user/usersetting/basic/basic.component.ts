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
  loading = false;
  user: any;

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    
    this.http.get('auth/currentuser').subscribe(
      res=>{
          this.user=res.Items[0];
          this.cdr.detectChanges();
        
        
      },err=>{
        
      },
      ()=>{
         }

    )
   
    // this.userLoading = false;
    // const st = localStorage.getItem('user');
    // const localUser = JSON.parse(st);

    // this.user = localUser;

    
  }

  save() {
    this.loading=false;
    this.http.put('auth/currentuser',this.user).subscribe(
      res=>{
        if(res.Message==='OK'){
          this.msg.success('成功！');
        }
        this.loading=true;
      },
      err=>{
        this.loading=true;
      },
      ()=>{
        
      }
    )
  }
}
