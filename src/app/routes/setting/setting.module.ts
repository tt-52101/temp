import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingImportComponent } from './import/import.component';
import { SettingSetComponent } from './set/set.component';
import { SettingSetEditComponent } from './set/edit/edit.component';
import { SettingSetViewComponent } from './set/view/view.component';
import { SettingImportBatchimportComponent } from './import/batchimport/batchimport.component';
import { SettingImportSingleimportComponent } from './import/singleimport/singleimport.component';
import { SettingImportViewimportComponent } from './import/viewimport/viewimport.component';

const COMPONENTS = [
  SettingImportComponent,
  SettingSetComponent,
  SettingImportBatchimportComponent,
  SettingImportSingleimportComponent,
];
const COMPONENTS_NOROUNT = [
  SettingSetEditComponent,
  SettingSetViewComponent,
  SettingImportViewimportComponent,
];

@NgModule({
  imports: [SharedModule, SettingRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class SettingModule {}
