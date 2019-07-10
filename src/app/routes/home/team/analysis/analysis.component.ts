import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-home-team-analysis',
  templateUrl: './analysis.component.html',
})
export class HomeTeamAnalysisComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
