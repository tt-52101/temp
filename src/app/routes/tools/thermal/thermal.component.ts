import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-Tools-thermal',
  templateUrl: './thermal.component.html',
})
export class ToolsThermalComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
