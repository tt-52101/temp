import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-set-serviceset',
  templateUrl: './serviceset.component.html',
})
export class SettingSetServicesetComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
