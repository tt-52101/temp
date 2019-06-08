import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsThermalComponent } from './thermal/thermal.component';
import { ToolsPhototoolComponent } from './phototool/phototool.component';
import { ToolsPhotometricComponent } from './photometric/photometric.component';
import { ToolsColormetricComponent } from './colormetric/colormetric.component';

const COMPONENTS = [
  ToolsThermalComponent,
  ToolsPhototoolComponent,
  ToolsPhotometricComponent,
  ToolsColormetricComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ToolsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ToolsModule { }
