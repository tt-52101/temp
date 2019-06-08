import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-routes-home-team-jobinchart',
  templateUrl: './jobinchart.component.html',
})
export class RoutesHomeTeamJobinchartComponent implements OnInit {

  constructor(private http: _HttpClient) { }
  @Input() monthJobinData:any=[];
  ngOnInit() {
    
  }

}
