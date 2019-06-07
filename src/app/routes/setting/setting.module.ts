import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingImportComponent } from './import/import.component';
import { SettingSetComponent } from './set/set.component';
import { SettingSetViewComponent } from './set/view/view.component';
import { SettingImportBatchimportComponent } from './import/batchimport/batchimport.component';
import { SettingImportSingleimportComponent } from './import/singleimport/singleimport.component';
import { SettingImportViewimportComponent } from './import/viewimport/viewimport.component';
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

const COMPONENTS = [
  SettingImportComponent,
  SettingSetComponent,
  SettingImportBatchimportComponent,
  SettingImportSingleimportComponent,
  SettingSetClientsetComponent,
  SettingSetServicesetComponent,
  SettingSetEditClienteditComponent,
  SettingSetEditServiceeditComponent,
  SettingTeamsetComponent,
  SettingTeamsetEditMonthlyDataEditComponent,
  SettingTeamsetTargetComponent,
  SettingTeamsetMembersComponent,
  SettingImportEditProjectComponent,
  SettingImportEditRecordsComponent,
  SettingTeamsetEditStaffComponent];
const COMPONENTS_NOROUNT = [
  SettingSetViewComponent,
  SettingImportViewimportComponent,
];

@NgModule({
  imports: [SharedModule, SettingRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SettingModule {}
