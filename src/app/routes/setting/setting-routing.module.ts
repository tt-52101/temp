import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingImportComponent } from './import/import.component';
import { SettingSetComponent } from './set/set.component';
import { SettingSetClientsetComponent } from './set/clientset/clientset.component';
import { SettingSetServicesetComponent } from './set/serviceset/serviceset.component';
import { SettingSetEditClienteditComponent } from './set/edit/clientedit/clientedit.component';
import { SettingSetEditServiceeditComponent } from './set/edit/serviceedit/serviceedit.component';
import { SettingTeamsetComponent } from './teamset/teamset.component';
import { SettingTeamsetEditMonthlyDataEditComponent } from './teamset/edit/monthly-data-edit/monthly-data-edit.component';
import { SettingTeamsetTargetComponent } from './teamset/target/target.component';
import { SettingTeamsetMembersComponent } from './teamset/members/members.component';

const routes: Routes = [
  { path: 'import', component: SettingImportComponent },
  { path: 'set', component: SettingSetComponent },
  { path: 'teamset', component: SettingTeamsetComponent },
  { path: 'monthlyDataEdit', component: SettingTeamsetEditMonthlyDataEditComponent },
  { path: 'target', component: SettingTeamsetTargetComponent },
  { path: 'members', component: SettingTeamsetMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
