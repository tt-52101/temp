import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-routes-home-dashboards-edit',
  templateUrl: './edit.component.html',
})
export class RoutesHomeDashboardsEditComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
