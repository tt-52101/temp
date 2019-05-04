import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutProComponent } from '@brand';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserLockComponent } from './passport/lock/lock.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { SimpleGuard, JWTGuard } from '@delon/auth';
import { RoutesHomeTeamComponent } from './home/team/team.component';
import { RoutesHomeDashboardsComponent } from './home/dashboards/dashboards.component';
import { RoutesHomePersonelComponent } from './home/personel/personel.component';
import { RoutesHomeDashboardsEditComponent } from './home/dashboards/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    canActivateChild: [JWTGuard],
    children: [
      { path: '', redirectTo: 'home/dashboards', pathMatch: 'full' },
      { path: 'home', redirectTo: 'home/dashboards', pathMatch: 'full' },
      { path: 'home/team', component: RoutesHomeTeamComponent },
      { path: 'home/dashboards', component: RoutesHomeDashboardsComponent },
      { path: 'home/personel', component: RoutesHomePersonelComponent },
      {
        path: 'settings',
        loadChildren: './setting/setting.module#SettingModule',
      },
      {
        path: 'tools',
        loadChildren: './tools/tools.module#ToolsModule',
      },
      // Exception
      {
        path: 'exception',
        loadChildren: './exception/exception.module#ExceptionModule',
      },
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
