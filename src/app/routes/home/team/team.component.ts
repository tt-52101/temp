import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-routes-home-team',
  templateUrl: './team.component.html',
})
export class RoutesHomeTeamComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
