
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { RoutesHomeTeamComponent } from './team/team.component';
import { RoutesHomePersonelComponent } from './personel/personel.component';
import { RoutesHomeTeamRevenuechartComponent } from './team/revenuechart/revenuechart.component';
import { RoutesHomeTeamJobinchartComponent } from './team/jobinchart/jobinchart.component';

const COMPONENTS = [
  RoutesHomeTeamComponent,
  RoutesHomePersonelComponent,
];
const COMPONENTS_NOROUNT = [
  RoutesHomeTeamRevenuechartComponent,
  RoutesHomeTeamJobinchartComponent
];

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class HomeModule { }
