import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserUsersettingComponent } from './usersetting/usersetting.component';
import { UserUsersettingBasicComponent } from './usersetting/basic/basic.component';
import { UserUsersettingSecurityComponent } from './usersetting/security/security.component';

const COMPONENTS = [
  UserUsersettingComponent,
  UserUsersettingBasicComponent,
  UserUsersettingSecurityComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
