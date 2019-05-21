import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-setting-import-singleimport',
  templateUrl: './singleimport.component.html',
})
export class SettingImportSingleimportComponent implements OnInit {

  constructor(private http: _HttpClient) { }
  stepText='执行';
  context='';
  ngOnInit() { }
  currentStep=1;
  status='process';
  

}
