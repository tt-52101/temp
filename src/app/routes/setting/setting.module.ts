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

const COMPONENTS = [
  SettingImportComponent,
  SettingSetComponent,
  SettingImportBatchimportComponent,
  SettingImportSingleimportComponent,
  SettingSetClientsetComponent,
  SettingSetServicesetComponent,
  SettingSetEditClienteditComponent];
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
