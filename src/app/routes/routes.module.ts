

import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserLockComponent } from './passport/lock/lock.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { RoutesHomeDashboardsComponent } from './dashboards/dashboards.component';
import { RoutesDashboardsProjectdetailsComponent } from './dashboards/projectdetails/projectdetails.component';
import { RoutesDashboardsProgressComponent } from './dashboards/progress/progress.component';
import { RoutesDashboardsTaskComponent } from './dashboards/task/task.component';
import { RoutesComponentsProjectDrawerViewComponent } from './components/project-drawer-view/project-drawer-view.component';
const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  UserLockComponent,
  // single pages
  CallbackComponent,
  RoutesHomeDashboardsComponent,
  RoutesDashboardsProjectdetailsComponent,
  ];
const COMPONENTS_NOROUNT = [
  RoutesComponentsProjectDrawerViewComponent,
  RoutesDashboardsProgressComponent,
  RoutesDashboardsTaskComponent];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
