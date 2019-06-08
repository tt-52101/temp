import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-Tools-photometric',
  templateUrl: './photometric.component.html',
})
export class ToolsPhotometricComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
