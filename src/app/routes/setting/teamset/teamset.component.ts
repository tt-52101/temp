import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { STColumn } from '@delon/abc';
import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettingTeamsetEditMonthlyDataEditComponent } from './edit/monthly-data-edit/monthly-data-edit.component';

@Component({
  selector: 'app-setting-teamset',
  templateUrl: './teamset.component.html',
})
export class SettingTeamsetComponent implements OnInit {
  constructor(private http: _HttpClient, private fb: FormBuilder) {}
  
  ngOnInit() {
    
  }
  loading = false;
  pageInfo = {
    show: false,

    showQuickJumper: false,
    showSize: false,
  };
  
  
  tableCon: STColumn[] = [
    { title: 'No', type: 'no' },
    { title: 'Month', index: 'Month', width: '100px' },
    {
      title: 'Budget',
      index: 'Budget',
      type: 'currency',
      statistical: 'sum',
      key: 'sum1',
    },
    {
      title: 'Actual',
      index: 'Actual',
      type: 'currency',
      statistical: 'sum',
      key: 'sum2',
    },
    { title: 'Percent', index: 'Percent', statistical: 'average', key: 'avg' },
    {
      title: 'Operate',
      buttons: [
        {
          icon: 'edit',
          type: 'static',
          modal: {
            component: SettingTeamsetEditMonthlyDataEditComponent,
            size: 'md',
            paramsName: 'i',
          },
          click: 'load',
        },
      ],
    },
  ];
  
}
