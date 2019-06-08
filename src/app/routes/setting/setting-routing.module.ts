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
import { SettingImportEditProjectComponent } from './import/edit/project/project.component';
import { SettingImportEditRecordsComponent } from './import/edit/records/records.component';
import { SettingTeamsetEditStaffComponent } from './teamset/edit/staff/staff.component';
import { SettingTeamsetRoutingComponent } from './teamset/routing/routing.component';

const routes: Routes = [
  { path: 'import', component: SettingImportComponent },
  { path: 'set', component: SettingSetComponent },
  {path:'clientedit',component:SettingSetEditClienteditComponent},
  {path:'serviceedit',component:SettingSetEditServiceeditComponent},
  { path: 'teamset', component: SettingTeamsetComponent },
  { path: 'monthlyDataEdit', component: SettingTeamsetEditMonthlyDataEditComponent },
  { path: 'target', component: SettingTeamsetTargetComponent },
  { path: 'members', component: SettingTeamsetMembersComponent },
  { path: 'project', component: SettingImportEditProjectComponent },
  { path: 'records', component: SettingImportEditRecordsComponent },
  { path: 'staff', component: SettingTeamsetEditStaffComponent },
  { path: 'routing', component: SettingTeamsetRoutingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
