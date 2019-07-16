import { Injectable, Component } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingTeamsetTargetComponent } from 'app/routes/setting/teamset/target/target.component';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class TargetPageGuardGuard
  implements CanDeactivate<SettingTeamsetTargetComponent> {
  constructor(public msg: NzMessageService) {}

  canDeactivate(
    component: SettingTeamsetTargetComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      console.log('into the guard');
    const isDirty = false;
    if (component.items.dirty) {
      const confirm = component.showConfirm();
      return component.notSave;
    } else {
      return true;
    }
  }
}
