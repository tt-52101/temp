
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { RoutesHomeTeamComponent } from './team/team.component';
import { RoutesHomePersonelComponent } from './personel/personel.component';
import { HomePersonelProjectComponent } from './personel/project/project.component';
import { HomeTeamAnalysisComponent } from './team/analysis/analysis.component';
import { HomePersonelCategorizeComponent } from './personel/categorize/categorize.component';


const COMPONENTS = [
  RoutesHomeTeamComponent,
  RoutesHomePersonelComponent,
  HomePersonelProjectComponent,
  HomeTeamAnalysisComponent];
const COMPONENTS_NOROUNT = [

  HomePersonelCategorizeComponent];

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
