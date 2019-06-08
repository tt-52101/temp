import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUsersettingComponent } from './usersetting/usersetting.component';
import { UserUsersettingBasicComponent } from './usersetting/basic/basic.component';
import { UserUsersettingSecurityComponent } from './usersetting/security/security.component';

const routes: Routes = [

  { path: 'setting', component: UserUsersettingComponent,children:[
    {path:'',redirectTo:'basic',pathMatch:'full'},
    { path: 'basic', component: UserUsersettingBasicComponent },
    { path: 'security', component: UserUsersettingSecurityComponent },
  ] },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
