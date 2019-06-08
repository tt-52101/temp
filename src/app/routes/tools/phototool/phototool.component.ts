import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-Tools-phototool',
  templateUrl: './phototool.component.html',
})
export class ToolsPhototoolComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
