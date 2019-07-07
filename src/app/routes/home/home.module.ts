
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { RoutesHomeTeamComponent } from './team/team.component';
import { RoutesHomePersonelComponent } from './personel/personel.component';


const COMPONENTS = [
  RoutesHomeTeamComponent,
  RoutesHomePersonelComponent,
];
const COMPONENTS_NOROUNT = [
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
