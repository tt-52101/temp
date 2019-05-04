import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-Tools-colormetric',
  templateUrl: './colormetric.component.html',
})
export class ToolsColormetricComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
