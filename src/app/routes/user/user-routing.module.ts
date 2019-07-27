import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUsersettingComponent } from './usersetting/usersetting.component';
import { UserUsersettingBasicComponent } from './usersetting/basic/basic.component';
import { UserUsersettingSecurityComponent } from './usersetting/security/security.component';
import { UserUsersettingSecurityPwdEditComponent } from './usersetting/security/pwd-edit/pwd-edit.component';
import { UserManageComponent } from './manage/manage.component';
import { UserManageUserEditComponent } from './manage/user-edit/user-edit.component';

const routes: Routes = [

  { path: 'setting', component: UserUsersettingComponent,children:[
    {path:'',redirectTo:'basic',pathMatch:'full'},
    { path: 'basic', component: UserUsersettingBasicComponent },
    { path: 'security', component: UserUsersettingSecurityComponent },
  ] },
  
  { path: 'PwdEdit', component: UserUsersettingSecurityPwdEditComponent },
  { path: 'manage', component: UserManageComponent },
  { path: 'userEdit', component: UserManageUserEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
