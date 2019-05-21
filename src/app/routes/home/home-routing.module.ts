import { RoutesHomeTeamComponent } from './team/team.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesHomePersonelComponent } from './personel/personel.component';

const routes: Routes = [
  {path:'personel',component:RoutesHomePersonelComponent},
  {path:'team',component:RoutesHomeTeamComponent},
  {path:'',redirectTo:'home/personel',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
