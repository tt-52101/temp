import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsThermalComponent } from './thermal/thermal.component';
import { ToolsPhototoolComponent } from './phototool/phototool.component';
import { ToolsPhotometricComponent } from './photometric/photometric.component';
import { ToolsColormetricComponent } from './colormetric/colormetric.component';

const routes: Routes = [
  { path: 'thermal', component: ToolsThermalComponent },
  { path: 'phototool', component: ToolsPhototoolComponent },
  { path: 'photometric', component: ToolsPhotometricComponent },
  { path: 'colormetric', component: ToolsColormetricComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
