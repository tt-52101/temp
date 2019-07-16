import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-usersetting-security-pwd-edit',
  templateUrl: './pwd-edit.component.html',
})
export class UserUsersettingSecurityPwdEditComponent implements OnInit {

  constructor(private http: _HttpClient,public msg:NzMessageService) { }
  user:any;
  Password='';
  NewPassword='';
  ConfirmPwd='';
  loading=false;
  ngOnInit() {
    const st = localStorage.getItem('user');
    const localUser = JSON.parse(st);

    this.user = localUser;
   }

  submit(){
    console.log(this.user.name);
    this.loading=true;
    this.http.post('auth/changepwd',
    {
      UserName:this.user.name,
      SecuredPwd:this.Password,
      SecuredNewPwd:this.NewPassword
    }).subscribe(
      res=>{
        if(res.Message==='OK'){
          this.msg.success('密码修改成功！');
          this.loading=false;
        }
        else{
          this.msg.success('密码修改不成功！');
          this.loading=false;
        }
      },
      err=>{
        this.loading=false;
      },
      ()=>{
        
      }
    );
  }
}
