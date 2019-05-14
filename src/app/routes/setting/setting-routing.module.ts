import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingImportComponent } from './import/import.component';
import { SettingSetComponent } from './set/set.component';
import { SettingSetClientsetComponent } from './set/clientset/clientset.component';
import { SettingSetServicesetComponent } from './set/serviceset/serviceset.component';
import { SettingSetEditClienteditComponent } from './set/edit/clientedit/clientedit.component';
import { SettingSetEditServiceeditComponent } from './set/edit/serviceedit/serviceedit.component';

const routes: Routes = [
  { path: 'import', component: SettingImportComponent },
  { path: 'set', component: SettingSetComponent },
  { path: 'clientset', component: SettingSetClientsetComponent },
  { path: 'serviceset', component: SettingSetServicesetComponent },
  { path: 'clientedit', component: SettingSetEditClienteditComponent },
  { path: 'serviceedit', component: SettingSetEditServiceeditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
