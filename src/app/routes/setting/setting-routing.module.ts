import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingImportComponent } from './import/import.component';
import { SettingSetComponent } from './set/set.component';

const routes: Routes = [
  { path: 'import', component: SettingImportComponent },
  { path: 'set', component: SettingSetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
