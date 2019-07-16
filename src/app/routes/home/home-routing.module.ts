import { RoutesHomeTeamComponent } from './team/team.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesHomePersonelComponent } from './personel/personel.component';
import { HomeTeamEngineerComponent } from './team/engineer/engineer.component';
import { HomePersonelProjectComponent } from './personel/project/project.component';
import { HomeTeamAnalysisComponent } from './team/analysis/analysis.component';

const routes: Routes = [
  {path:'personel',component:RoutesHomePersonelComponent},
  {path:'team',component:RoutesHomeTeamComponent},
  {path:'',redirectTo:'home/personel',pathMatch:'full'},
  { path: 'engineer/:engineerName', component: HomeTeamEngineerComponent },
  { path: 'project/:projectNo', component: HomePersonelProjectComponent },
  { path: 'analysis', component: HomeTeamAnalysisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
